const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent delete relationship', () => {

  let agent1, company1, company2, agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const company2Props = {
    email: 'company2@test.com',
    password: '1234'
  }

  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent' })

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    agent1.companies.push(company1)
    agent1.companies.push(company2)
    company1.agents.push(agent1)
    company1.agents.push(agent1)

    Promise.all([
        agent1.save(),
        company1.save(),
        company2.save()
      ])
      .then(() => {
        request(app)
          .post('/agents/signin')
          .send(agent1SigninProps)
          .end((err, res) => {
            agent1Token = res.body.token

            done()
          })
      })
  })

  it('one relationship', done => {
    request(app)
      .delete(`/agents/relationship/${company1._id}`)
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Promise.all([
            Agent.findOne({
              _id: agent1._id,
              companies: company1._id
            }),
            Company.findOne({
              _id: company1._id,
              agents: agent1._id
            }),
            Agent.findOne({
              _id: agent1._id,
              companies: company2._id
            })
          ])
          .then(results => {

            expect(results[0]).to.equal(null)
            expect(results[1]).to.equal(null)
            expect(results[2].companies.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

  it('two relationship', done => {
    request(app)
      .delete(`/agents/relationship/${company1._id}`)
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .delete(`/agents/relationship/${company2._id}`)
          .set('authorization', agent1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Agent.findOne({
                  _id: agent1._id,
                  companies: company1._id
                }),
                Company.findOne({
                  _id: company1._id,
                  agents: agent1._id
                }),
                Agent.findOne({
                  _id: agent1._id,
                  companies: company2._id
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