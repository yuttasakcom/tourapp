const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')
const password = require('../../../helpers/password')

describe('Company get agents list', () => {

  let company1, agent1, agent2, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
  }

  const agent2Props = {
    email: 'agent2@test.com',
    password: password.hash
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company', password: password.raw })

  beforeEach(done => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

    company1.agents.push(agent1)
    company1.agents.push(agent2)

    Promise.all([
        company1.save(),
        agent1.save(),
        agent2.save()
      ])
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            company1Token = res.body.token

            done()
          })
      })
  })

  it('two agents', done => {
    request(app)
      .get('/companies/agents')
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const agents = res.body
        expect(agents.length).to.equal(2)
        expect(agents[0].email).to.equal(agent1Props.email)
        expect(agents[1].email).to.equal(agent2Props.email)
        done()
      })
  })
})
