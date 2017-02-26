const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const parallel = require('async/parallel')
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')
const Booking = mongoose.model('Booking')
const { password } = require('../../../helpers/mock')

describe('Booking', () => {

  let company1, company2, company1Token, company2Token, agent1, agent1Token, agentEmployee1Token

  const agentEmployee1Props = {
    email: 'agentemployee1@test.com',
    password: password.hash,
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
    employees: [agentEmployee1Props]
  }

  const agentEmployee1SigninProps = {
    email: 'agent1@test.com..agentemployee1@test.com',
    password: password.raw,
    role: 'agentEmployee'
  }

  let companyPkgsStubs = new Array(5)
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
    password: password.hash,
    pkgs: companyPkgsStubs
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
    pkgs: companyPkgsStubs
  }

  const touristProps = {
    name: 'Paiboon',
    phoneNumber: '024283192',
    hotel: 'clusterkit hotel',
    adult: 3,
    child: 1,
    nationality: 'thai',
    date: new Date(),
    note: 'awesome trip'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company', password: password.raw })
  const company2SigninProps = Object.assign({}, company2Props, { role: 'company', password: password.raw })
  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent', password: password.raw })

  beforeEach(done => {
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)
    agent1 = new Agent(agent1Props)

    Promise.all([
        company1.save(),
        company2.save(),
        agent1.save()
      ])
      .then(() => {
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
                .post('/agents/signin')
                .send(agent1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            (cb) => {
              request(app)
                .post('/agents-employees/signin')
                .send(agentEmployee1SigninProps)
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
            }
          ],
          (err, results) => {
            company1Token = results[0]
            agent1Token = results[1]
            agentEmployee1Token = results[2]
            company2Token = results[3]
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

  describe.only('Company offer special price', () => {

    it('offer package1 to agent1', done => {
      const pkg = company1.pkgs[0]

      request(app)
        .post(`/companies/pkgs/${pkg._id}/special-prices`)
        .send({
          agent: agent1._id,
          priceAdult: 2500,
          priceChild: 1500
        })
        .set('authorization', company1Token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          Company.findById(company1._id, {
              pkgs: {
                $elemMatch: { _id: pkg._id }
              }
            })
            .then(company => {
              console.log(company)
              done()
            })
        })
    })

  })

  describe('Agent employee get pkgs list', () => {

    it('one member', done => {
      request(app)
        .get('/agents-employees/pkgs')
        .set('authorization', agentEmployee1Token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.length).to.equal(1)
          done()
        })
    })
  })

  describe('Agent employee add booking', () => {

    it('one booking', done => {
      const booking1Props = {
        company: company1._id,
        pkg: company1.pkgs[0]._id,
        tourist: touristProps
      }
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          Booking.count()
            .then(count => {
              expect(count).to.equal(1)
              done()
            })
            .catch(done)
        })
    })

    it('not member must return status 401', done => {
      const booking1Props = {
        company: company2._id,
        pkg: company2.pkgs[0]._id,
        tourist: touristProps
      }
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)

          Booking.count()
            .then(count => {
              expect(count).to.equal(0)
              done()
            })
            .catch(done)
        })

    })
  })

  describe('Company get bookings list', () => {

    it('get bookings', done => {
      const booking1Props = {
        company: company1._id,
        pkg: company1.pkgs[0]._id,
        tourist: touristProps
      }
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          request(app)
            .get('/companies/bookings')
            .set('authorization', company1Token)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)

              expect(res.body.length).to.equal(1)
              done()
            })
        })
    })
  })
})
