const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe.only('Company add relation', () => {

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
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)

    Promise.all([
        agent1.save(),
        company1.save()
      ])
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            company1Token = res.body.token

            request(app)
              .post('/agents/signin')
              .send(agent1SigninProps)
              .end((err, res) => {
                agent1Token = res.body.token

                done()
              })
          })
      })
  })

  it('one agent', done => {
    request(app)
      .post('/companies/agents')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Promise.all([
            Company.findById(company1._id),
            Agent.findById(agent1._id)
          ])
          .then(result => {
            expect(result[0].agents.length).to.equal(1)
            expect(result[1].companies.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

})
