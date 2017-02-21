const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const series = require('async/series')
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe.only('Company accept', () => {

  let company1, agent1, company1Token, agent1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
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
        series([
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
            done()
          })

      })
  })

  it('test', done => {
    console.log(company1Token)
    console.log(agent1Token)
    done()
  })
})
