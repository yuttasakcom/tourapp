import request from 'supertest'
import { expect } from 'chai'
import { parallel } from 'async'
import mongoose from 'mongoose'
import app from '../../app'
import { password } from '../../helpers/mock'

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')
const Pkg = mongoose.model('Pkg')

describe('Agent get pkgs', () => {
  let company1
  let company2
  let agent1
  let company1Token
  let company2Token
  let agent1Token

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1SigninProps = {...company1Props, role: 'company', password: password.raw }
  const company2SigninProps = {...company2Props, role: 'company', password: password.raw }
  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)
    agent1 = new Agent(agent1Props)

    const company1PkgsStubs = new Array(10)
      .fill(undefined)
      .map((val, key) => ({
        company: company1._id,
        name: `name_test${key}`,
        description: `description_test${key}`,
        priceAdult: '3000',
        priceChild: '2000',
      }))

    const company2PkgsStubs = new Array(10)
      .fill(undefined)
      .map((val, key) => ({
        company: company2._id,
        name: `name_test${key}`,
        description: `description_test${key}`,
        priceAdult: '3000',
        priceChild: '2000',
      }))

    const pkgsStubs = company1PkgsStubs.concat(company2PkgsStubs)

    Promise
      .all([
        company1.save(),
        company2.save(),
        agent1.save(),
        Pkg.insertMany(pkgsStubs),
      ])
      .then(() => {
        parallel(
          [
            cb => {
              request(app)
                .post('/companies/signin')
                .send(company1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            cb => {
              request(app)
                .post('/companies/signin')
                .send(company2SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            cb => {
              request(app)
                .post('/agents/signin')
                .send(agent1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
          ],
          (err, results) => {
            company1Token = results[0]
            company2Token = results[1]
            agent1Token = results[2]
            request(app)
              .post('/agents/request')
              .send({ _id: company1._id })
              .set('authorization', agent1Token)
              .end(res1Err => {
                if (err) return done(res1Err)

                return request(app)
                  .post('/companies/accept')
                  .send({ _id: agent1._id })
                  .set('authorization', company1Token)
                  .end(res2Err => {
                    if (res2Err) return done(res2Err)

                    return done()
                  })
              })
          })
      })
  })

  it('one member', done => {
    request(app)
      .get('/agents/pkgs')
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.length).to.equal(10)
        return done()
      })
  })

  it('two member', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company2._id })
      .set('authorization', agent1Token)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/companies/accept')
          .send({ _id: agent1._id })
          .set('authorization', company2Token)
          .end(res1Err => {
            if (res1Err) return done(res1Err)

            return request(app)
              .get('/agents/pkgs')
              .set('authorization', agent1Token)
              .expect(200)
              .end((res2Err, res) => {
                if (res2Err) return done(res2Err)

                expect(res.body.length).to.equal(20)
                return done()
              })
          })
      })
  })

  it('if has special price show special price', done => {
    Pkg.findOne({ company: company1._id, name: 'name_test0' })
      .then(pkg => {
        pkg.specialPrices.push({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500,
        })
        pkg.specialPrices.push({
          agent: company2._id,
          priceAdult: 1500,
          priceChild: 500,
        })

        pkg.save()
          .then(() => {
            request(app)
              .get('/agents/pkgs')
              .set('authorization', agent1Token)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err)

                expect(res.body[0].priceAdult).to.equal(2500)
                return done()
              })
          })
      })
  })
})
