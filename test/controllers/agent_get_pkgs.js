const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const parallel = require('async/parallel')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

describe.only('Agent get pkgs', () => {

  let company1, agent1, company1Token, agent1Token

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
    password: '1234',
    pkgs: companyPkgsStubs
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })
  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent' })

  beforeEach(done => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)

    Promise.all([
        company1.save(),
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
            }
          ],
          (err, results) => {
            company1Token = results[0]
            agent1Token = results[1]
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
                  .expect(200)
                  .end((err, res) => {
                    if (err) return done(err)

                    done()
                  })
              })
          })

      })
  })

  it('one member', done => {
    Company.findById(company1._id)
      .then(company => {
        console.log(company)
        done()
      })
  })
})
