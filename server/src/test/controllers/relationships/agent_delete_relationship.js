import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../app'
import { password } from '../../../helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent delete relationship', () => {
  let agent1
  let company1
  let company2
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
  }

  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    agent1.companies.push(company1)
    agent1.companies.push(company2)
    company1.agents.push(agent1)
    company1.agents.push(agent1)

    Promise
      .all([
        agent1.save(),
        company1.save(),
        company2.save(),
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
      .end(err => {
        if (err) return done(err)

        return Promise
          .all([
            Agent.findOne({
              _id: agent1._id,
              companies: company1._id,
            }),
            Company.findOne({
              _id: company1._id,
              agents: agent1._id,
            }),
            Agent.findOne({
              _id: agent1._id,
              companies: company2._id,
            }),
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
      .end(err => {
        if (err) return done(err)

        return request(app)
          .delete(`/agents/relationship/${company2._id}`)
          .set('authorization', agent1Token)
          .expect(200)
          .end(err1 => {
            if (err1) return done(err1)

            return Promise
              .all([
                Agent.findOne({
                  _id: agent1._id,
                  companies: company1._id,
                }),
                Company.findOne({
                  _id: company1._id,
                  agents: agent1._id,
                }),
                Agent.findOne({
                  _id: agent1._id,
                  companies: company2._id,
                }),
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
