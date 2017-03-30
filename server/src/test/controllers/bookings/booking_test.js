import request from 'supertest'
import { expect } from 'chai'
import { parallel } from 'async/parallel'
import mongoose from 'mongoose'
import app from '../../../app'
import { password } from '../../../helpers/mock'
import { status } from '../../../helpers/booking'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')
const Booking = mongoose.model('Booking')
const Pkg = mongoose.model('Pkg')

describe('Booking', () => {
  let company1
  let company2
  let company1Token
  let agent1
  let agent1Token
  let agentEmployee1Token

  const agentEmployee1Props = {
    email: 'agentemployee1@test.com',
    password: password.hash,
    name: 'name_test',
    phoneNumber: '024283192',
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
    employees: [agentEmployee1Props],
  }

  const agentEmployee1SigninProps = {
    email: 'agent1@test.com..agentemployee1@test.com',
    password: password.raw,
    role: 'agentEmployee',
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
  }

  const touristProps = {
    name: 'Paiboon',
    phoneNumber: '024283192',
    hotel: 'clusterkit hotel',
    adult: 3,
    child: 1,
    nationality: 'thai',
    date: new Date(),
    note: 'awesome trip',
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
                .post('/agents/signin')
                .send(agent1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            cb => {
              request(app)
                .post('/agents-employees/signin')
                .send(agentEmployee1SigninProps)
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
          ],
          (err, results) => {
            company1Token = results[0]
            agent1Token = results[1]
            agentEmployee1Token = results[2]
            request(app)
              .post('/agents/request')
              .send({ _id: company1._id })
              .set('authorization', agent1Token)
              .end(err1 => {
                if (err1) return done(err1)

                return request(app)
                  .post('/companies/accept')
                  .send({ _id: agent1._id })
                  .set('authorization', company1Token)
                  .end(err2 => {
                    if (err2) return done(err2)

                    return done()
                  })
              })
          })
      })
  })

  describe('Company offer special price', () => {
    it('offer package1 to agent1', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          request(app)
            .post(`/companies/pkgs/${pkg._id}/special-prices`)
            .send({
              agent: agent1._id,
              priceAdult: 2500,
              priceChild: 1500,
            })
            .set('authorization', company1Token)
            .expect(200)
            .end(err => {
              if (err) return done(err)

              return Pkg
                .findById(pkg._id, {
                  specialPrices: {
                    $elemMatch: { agent: agent1._id },
                  },
                })
                .then(pkg1 => {
                  expect(pkg1.specialPrices[0].priceAdult).to.equal(2500)
                  return done()
                })
            })
        })
    })

    it('offer same pkg again must update', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          request(app)
            .post(`/companies/pkgs/${pkg._id}/special-prices`)
            .send({
              agent: agent1._id,
              priceAdult: 2500,
              priceChild: 1500,
            })
            .set('authorization', company1Token)
            .end(err => {
              if (err) return done(err)

              return request(app)
                .post(`/companies/pkgs/${pkg._id}/special-prices`)
                .send({
                  agent: company1._id,
                  priceAdult: 5555,
                  priceChild: 4444,
                })
                .set('authorization', company1Token)
                .end(err1 => {
                  if (err1) return done(err1)

                  return request(app)
                    .post(`/companies/pkgs/${pkg._id}/special-prices`)
                    .send({
                      agent: agent1._id,
                      priceAdult: 2000,
                      priceChild: 1000,
                    })
                    .set('authorization', company1Token)
                    .end(err2 => {
                      if (err2) return done(err2)

                      return Pkg
                        .findById(pkg._id)
                        .then(pkg1 => {
                          expect(pkg1.specialPrices[0].priceAdult).to.equal(2000)
                          expect(pkg1.specialPrices[1].priceAdult).to.equal(5555)
                          done()
                        })
                        .catch(done)
                    })
                })
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

          expect(res.body.length).to.equal(10)
          return done()
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
                .get('/agents-employees/pkgs')
                .set('authorization', agentEmployee1Token)
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

  describe('Add booking', () => {
    let booking1Props

    beforeEach(done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {
          booking1Props = {
            company: company1._id,
            pkg,
            tourist: touristProps,
          }
          done()
        })
    })

    it('agent one booking', done => {
      request(app)
        .post('/agents/bookings')
        .send(booking1Props)
        .set('authorization', agent1Token)
        .expect(200)
        .end(err => {
          if (err) return done(err)

          return Booking
            .count()
            .then(count => {
              expect(count).to.equal(1)
              done()
            })
            .catch(done)
        })
    })

    it('agent employee one booking', done => {
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)
        .end(err => {
          if (err) return done(err)

          return Booking
            .count()
            .then(count => {
              expect(count).to.equal(1)
              done()
            })
            .catch(done)
        })
    })

    it('agent employee not member must return status 401', done => {
      booking1Props.company = company2._id
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(401)
        .end(err => {
          if (err) return done(err)

          return Booking
            .count()
            .then(count => {
              expect(count).to.equal(0)
              done()
            })
            .catch(done)
        })
    })

    it('Company get bookings list', done => {
      request(app)
        .post('/agents-employees/bookings')
        .send(booking1Props)
        .set('authorization', agentEmployee1Token)
        .expect(200)
        .end(err => {
          if (err) return done(err)

          return request(app)
            .get('/companies/bookings')
            .set('authorization', company1Token)
            .expect(200)
            .end((err1, res) => {
              if (err1) return done(err1)

              expect(res.body.length).to.equal(1)
              return done()
            })
        })
    })
  })

  describe('Company change booking status', () => {
    it('accept', done => {
      request(app)
        .get('/agents-employees/pkgs')
        .set('authorization', agentEmployee1Token)
        .end((err, res) => {
          if (err) return done(err)

          const pkg = res.body[0]
          const booking1Props = {
            company: company1._id,
            pkg,
            tourist: touristProps,
          }

          return request(app)
            .post('/agents-employees/bookings')
            .send(booking1Props)
            .set('authorization', agentEmployee1Token)
            .end(err1 => {
              if (err1) return done(err1)

              return request(app)
                .get('/companies/bookings')
                .set('authorization', company1Token)
                .end((err2, res2) => {
                  if (err) return done(err)

                  const bookingId = res2.body[0]._id
                  return request(app)
                    .put(`/companies/bookings/${bookingId}`)
                    .send({ status: status.accepted })
                    .set('authorization', company1Token)
                    .expect(200)
                    .end(err3 => {
                      if (err3) return done(err3)

                      return Booking
                        .findById(bookingId)
                        .then(booking => {
                          expect(booking.status).to.equal(status.accepted)
                          done()
                        })
                        .catch(done)
                    })
                })
            })
        })
    })
  })
})
