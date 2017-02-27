const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const parallel = require('async/parallel')
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')
const Booking = mongoose.model('Booking')
const Pkg = mongoose.model('Pkg')
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

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash
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

    let company1PkgsStubs = new Array(10)
      .fill(undefined)
      .map((val, key) => {
        return {
          company: company1._id,
          name: `name_test${key}`,
          description: `description_test${key}`,
          priceAdult: '3000',
          priceChild: '2000'
        }
      })

    let company2PkgsStubs = new Array(10)
      .fill(undefined)
      .map((val, key) => {
        return {
          company: company2._id,
          name: `name_test${key}`,
          description: `description_test${key}`,
          priceAdult: '3000',
          priceChild: '2000'
        }
      })

    let pkgsStubs = company1PkgsStubs.concat(company2PkgsStubs)

    Promise.all([
        company1.save(),
        company2.save(),
        agent1.save(),
        Pkg.insertMany(pkgsStubs)
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

  describe('Company offer special price', () => {

    it('offer package1 to agent1', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {

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

              Pkg.findById(pkg._id, {
                  specialPrices: {
                    $elemMatch: { agent: agent1._id }
                  }
                })
                .then(pkg => {

                  expect(pkg.specialPrices[0].priceAdult).to.equal(2500)
                  done()
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
              priceChild: 1500
            })
            .set('authorization', company1Token)
            .end((err, res) => {
              if (err) return done(err)


              request(app)
                .post(`/companies/pkgs/${pkg._id}/special-prices`)
                .send({
                  agent: company1._id,
                  priceAdult: 5555,
                  priceChild: 4444
                })
                .set('authorization', company1Token)
                .end((err, res) => {
                  if (err) return done(err)

                  request(app)
                    .post(`/companies/pkgs/${pkg._id}/special-prices`)
                    .send({
                      agent: agent1._id,
                      priceAdult: 2000,
                      priceChild: 1000
                    })
                    .set('authorization', company1Token)
                    .end((err, res) => {
                      if (err) return done(err)

                      Pkg.findById(pkg._id)
                        .then(pkg => {
                          expect(pkg.specialPrices[0].priceAdult).to.equal(2000)
                          expect(pkg.specialPrices[1].priceAdult).to.equal(5555)
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
          done()
        })
    })

    it.only('if has special price show special price', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {

          pkg.specialPrices.push({
            agent: agent1._id,
            priceAdult: 2500,
            priceChild: 1500
          })
          pkg.specialPrices.push({
            agent: company2._id,
            priceAdult: 1500,
            priceChild: 500
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
                  done()
                })
            })
        })
    })
  })

  describe('Agent employee add booking', () => {

    it('one booking', done => {

      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {

          const booking1Props = {
            company: company1._id,
            pkg: pkg._id,
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
    })

    it('not member must return status 401', done => {
      Pkg.findOne({ company: company2._id, name: 'name_test0' })
        .then(pkg => {

          const booking1Props = {
            company: company2._id,
            pkg: pkg._id,
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
  })

  describe('Company get bookings list', () => {

    it('get bookings', done => {
      Pkg.findOne({ company: company1._id, name: 'name_test0' })
        .then(pkg => {

          const booking1Props = {
            company: company1._id,
            pkg: pkg._id,
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
})
