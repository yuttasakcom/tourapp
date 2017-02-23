const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe.only('Company delete relationship', () => {

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

    company1.agents.push(agent1)
    company1.agents.push(agent2)
    agent1.companies.push(company1)
    agent2.companies.push(company1)

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

  it('one relationship', done => {
    request(app)
      .delete(`/companies/relationship/${agent1._id}`)
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Promise.all([
            Company.findOne({
              _id: company1._id,
              agents: agent1._id
            }),
            Agent.findOne({
              _id: agent1._id,
              companies: company1._id
            }),
            Company.findOne({
              _id: company1._id,
              agents: agent2._id
            })
          ])
          .then(results => {

            expect(results[0]).to.equal(null)
            expect(results[1]).to.equal(null)
            expect(results[2].agents.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

  it('two relationship', done => {
    request(app)
      .delete(`/companies/relationship/${agent1._id}`)
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .delete(`/companies/relationship/${agent2._id}`)
          .set('authorization', company1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Company.findOne({
                  _id: company1._id,
                  agents: agent1._id
                }),
                Agent.findOne({
                  _id: agent1._id,
                  companies: company1._id
                }),
                Company.findOne({
                  _id: company1._id,
                  agents: agent2._id
                })
              ])
              .then(results => {

                expect(results[0]).to.equal(null)
                expect(results[1]).to.equal(null)
                expect(results[2]).to.equal(null)
                done()
              })
              .catch(done)
          })
      })
  })
})
