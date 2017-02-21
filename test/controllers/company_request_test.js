const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe.only('Company request', () => {

  let company1, agent1, agent2, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const agent2Props = {
    email: 'agent2@test.com',
    password: '1234'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

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

  it('must be appear on company request pendings', done => {
    request(app)
      .post('/companies/request')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Company.findById(company1._id)
          .then(company => {

            expect(company.requestPendings.length).to.equal(1)
            expect(company.requestPendings[0].toString()).to.equal(agent1._id.toString())
            done()
          })
          .catch(done)
      })
  })
})
