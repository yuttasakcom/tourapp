import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company delete relationship', () => {
  let company1
  let agent1
  let agent2
  let company1Token

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

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: password.raw
  }

  beforeEach(async () => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

    company1.agents.push(agent1)
    company1.agents.push(agent2)
    agent1.companies.push(company1)
    agent2.companies.push(company1)

    await Promise.all([company1.save(), agent1.save(), agent2.save()])
    const res = await request(app)
      .post('/companies/signin')
      .send(company1SigninProps)

    company1Token = res.body.token
  })

  it('one relationship', async () => {
    await request(app)
      .delete(`/companies/relationship/${agent1._id}`)
      .set('authorization', company1Token)
      .expect(200)

    const [res1, res2, res3] = await Promise.all([
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
    expect(res1).to.equal(null)
    expect(res2).to.equal(null)
    expect(res3.agents.length).to.equal(1)
  })

  it('two relationship', async () => {
    await request(app)
      .delete(`/companies/relationship/${agent1._id}`)
      .set('authorization', company1Token)
      .expect(200)

    await request(app)
      .delete(`/companies/relationship/${agent2._id}`)
      .set('authorization', company1Token)
      .expect(200)

    const [res1, res2, res3] = await Promise.all([
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
    expect(res1).to.equal(null)
    expect(res2).to.equal(null)
    expect(res3).to.equal(null)
  })
})
