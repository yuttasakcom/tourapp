const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const parallel = require('async/parallel')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')
const Pkg = mongoose.model('Pkg')
const { password } = require('../../helpers/mock')

describe('Agent get pkgs', () => {

  let company1, company2, agent1, company1Token, agent1Token



  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
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

  it('one member', done => {
    request(app)
      .get('/agents/pkgs')
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.length).to.equal(10)
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

                expect(res.body.length).to.equal(20)
                done()
              })
          })
      })
  })
})
