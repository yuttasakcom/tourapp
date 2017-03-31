import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../src/app'

const Company = mongoose.model('Company')
const Pkg = mongoose.model('Pkg')

describe('Company CRUD pkg', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234',
  }

  const company1SigninProps = {...company1Props, role: 'company' }

  beforeEach(done => {
    request(app)
      .post('/companies/signup')
      .send(company1Props)
      .end(() => {
        Company
          .findOne({ email: company1Props.email })
          .then(company => {
            company1 = company
            request(app)
              .post('/companies/signin')
              .send(company1SigninProps)
              .end((err, res) => {
                company1Token = res.body.token
                done()
              })
          })
      })
  })

  describe('Create pkg', () => {
    it('one pkg', done => {
      request(app)
        .post('/companies/pkgs')
        .send({
          name: 'name_test',
          description: 'description_test',
          priceAdult: '3000',
          priceChild: '2000',
        })
        .set('authorization', company1Token)
        .expect(201)
        .end(err => {
          if (err) return done(err)

          return Pkg
            .find({ company: company1._id })
            .then(pkgs => {
              expect(pkgs.length).to.equal(1)
              done()
            })
            .catch(done)
        })
    })

    it('two pkg', done => {
      request(app)
        .post('/companies/pkgs')
        .send({
          name: 'name_test1',
          description: 'description_test1',
          priceAdult: '3000',
          priceChild: '2000',
        })
        .set('authorization', company1Token)
        .expect(201)
        .end(err => {
          if (err) return done(err)

          return request(app)
            .post('/companies/pkgs')
            .send({
              name: 'name_test2',
              description: 'description_test2',
              priceAdult: '3000',
              priceChild: '2000',
            })
            .set('authorization', company1Token)
            .expect(201)
            .end(() => {
              if (err) return done(err)

              return Pkg
                .find({ company: company1._id })
                .then(pkgs => {
                  expect(pkgs.length).to.equal(2)
                  done()
                })
                .catch(done)
            })
        })
    })
  })

  describe('RUD pkg', () => {
    beforeEach(done => {
      const pkgsStubs = new Array(10)
        .fill(undefined)
        .map((val, key) => ({
          company: company1._id,
          name: `name_test${key}`,
          description: `description_test${key}`,
          priceAdult: '3000',
          priceChild: '2000',
        }))

      Pkg
        .insertMany(pkgsStubs)
        .then(() => {
          done()
        })
    })

    it('GET /companies/pkgs', done => {
      request(app)
        .get('/companies/pkgs')
        .set('authorization', company1Token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.length).to.equal(10)
          return done()
        })
    })

    it('GET /companies/pkgs/:id', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          const pkgId = pkg._id
          request(app)
            .get(`/companies/pkgs/${pkgId}`)
            .set('authorization', company1Token)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)

              expect(res.body.name).to.equal('name_test0')
              return done()
            })
        })
    })

    it('DELETE /companies/pkgs/:id', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          const pkgId = pkg._id
          request(app)
            .delete(`/companies/pkgs/${pkgId}`)
            .set('authorization', company1Token)
            .expect(200)
            .end(err => {
              if (err) return done(err)

              return Pkg
                .count({ _id: pkgId })
                .then(count => {
                  expect(count).to.equal(0)
                  done()
                })
            })
        })
    })

    it('PUT /companies/pkgs/:id', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          const pkgId = pkg._id
          request(app)
            .put(`/companies/pkgs/${pkgId}`)
            .set('authorization', company1Token)
            .send({
              name: 'updated_name',
              description: 'updated_description',
              priceAdult: 4000,
              priceChild: 3000,
            })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)

              const updatedPkg = res.body

              expect(updatedPkg.name).to.equal('updated_name')
              expect(updatedPkg.description).to.equal('updated_description')
              expect(updatedPkg.priceAdult).to.equal(4000)
              expect(updatedPkg.priceChild).to.equal(3000)

              return Pkg
                .findById(pkgId)
                .then(updatedResPkg => {
                  expect(updatedResPkg.name).to.equal('updated_name')
                  expect(updatedResPkg.description).to.equal('updated_description')
                  expect(updatedResPkg.priceAdult).to.equal(4000)
                  expect(updatedResPkg.priceChild).to.equal(3000)
                  done()
                })
            })
        })
    })
  })
})
