const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const parallel = require('async/parallel')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

describe('Agent get pkgs', () => {

  let company1, company2, agent1, company1Token, agent1Token

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

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const company2Props = {
    email: 'company2@test.com',
    password: '1234'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })
  const company2SigninProps = Object.assign({}, company2Props, { role: 'company' })
  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent' })

  beforeEach(done => {
    parallel([
      (cb) => {
        request(app)
          .post('/companies/signup')
          .send(company1Props)
          .end((err, res) => {
            cb()
          })
      },
      (cb) => {
        request(app)
          .post('/companies/signup')
          .send(company2Props)
          .end((err, res) => {
            cb()
          })
      },
      (cb) => {
        request(app)
          .post('/agents/signup')
          .send(agent1Props)
          .end((err, res) => {
            cb()
          })
      }
    ], (err, results) => {
      Promise.all([
        Company.update({}, {
          $pushAll: { pkgs: companyPkgsStubs }
        }),
        Company.findOne({ email: company1Props.email }),
        Company.findOne({ email: company2Props.email }),
        Agent.findOne({ email: agent1Props.email })
      ])
      .then(results => {
        company1 = results[1]
        company2 = results[2]
        agent1 = results[3]
        parallel([
            (cb) => {
              request(app)
                .post('/companies/signin')
                .send(company1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            (cb) => {
              request(app)
                .post('/companies/signin')
                .send(company2SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            (cb) => {
              request(app)
                .post('/agents/signin')
                .send(agent1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            }
          ],
          (err, results) => {
            company1Token = results[0]
            company2Token = results[1]
            agent1Token = results[2]
            request(app)
              .post('/agents/request')
              .send({ _id: company1._id })
              .set('authorization', agent1Token)
              .end((err, res) => {
                if (err) return done(err)

                request(app)
                  .post('/companies/accept')
                  .send({ _id: agent1._id })
                  .set('authorization', company1Token)
                  .end((err, res) => {
                    if (err) return done(err)

                    done()
                  })
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

        expect(res.body.length).to.equal(1)
        done()
      })
  })

  it('two member', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company2._id })
      .set('authorization', agent1Token)
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/companies/accept')
          .send({ _id: agent1._id })
          .set('authorization', company2Token)
          .end((err, res) => {
            if (err) return done(err)

            request(app)
              .get('/agents/pkgs')
              .set('authorization', agent1Token)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err)

                expect(res.body.length).to.equal(2)
                done()
              })
          })
      })
  })
})
