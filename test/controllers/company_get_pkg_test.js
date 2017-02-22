const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Company = mongoose.model('Company')

describe('Company add pkg', () => {

  let company1, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  let companyPkgsStubs = new Array(10)
    .fill(undefined)
    .map((val, key) => {
      return {
        name: `name_test${key}`,
        description: `description_test${key}`,
        priceAdult: '3000',
        priceChild: '2000'
      }
    })

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {

    company1 = new Company(company1Props)
    company1.save()
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            company1Token = res.body.token

            Company.update({ _id: company1._id }, {
                $pushAll: { pkgs: companyPkgsStubs }
              })
              .then(() => {
                done()
              })
          })
      })
  })

  it('GET /companies/pkgs', done => {
    request(app)
      .get('/companies/pkgs')
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.pkgs.length).to.equal(10)
        done()
      })
  })

  it.only('GET /companies/pkgs/:id', done => {
    Company.findById(company1._id, {
        _id: 0,
        acceptPendings: 0,
        requestPendings: 0,
        agents: 0,
        pkgs: {
          $elemMatch: { name: 'name_test0' }
        }
      })
      .then(company => {
        const pkgId = company.pkgs[0]._id
        request(app)
          .get(`/companies/pkgs/${pkgId}`)
          .set('authorization', company1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            expect(res.body.name).to.equal(company.pkgs[0].name)
            done()
          })
      })
  })

})
