import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'
import { companyRequest, agentAccept } from './helpers'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent accept', () => {
  let company1
  let agent1
  let company1Token
  let agent1Token

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
  }

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: password.raw
  }
  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: password.raw
  }

  beforeEach(async () => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)

    await Promise.all([company1.save(), agent1.save()])
    const [res1, res2] = await Promise.all([
      request(app).post('/companies/signin').send(company1SigninProps),
      request(app).post('/agents/signin').send(agent1SigninProps)
    ])
    company1Token = res1.body.token
    agent1Token = res2.body.token
    await companyRequest(company1Token, agent1)
  })

  it('must remove agent accept pendings and company request pendings', async () => {
    await agentAccept(agent1Token, company1)
    const agent = await Agent.findById(agent1._id)
    expect(agent.acceptPendings.length).to.equal(0)
  })

  it('must remove company request pendings', async () => {
    await agentAccept(agent1Token, company1)
    const company = await Company.findById(company1._id)
    expect(company.requestPendings.length).to.equal(0)
  })

  it('duplicate accept must return status 422', async () => {
    await agentAccept(agent1Token, company1).expect(200)
    await agentAccept(agent1Token, company1).expect(422)
  })

  it('completed company must appear in agent.companies', async () => {
    await agentAccept(agent1Token, company1)
    const agent = await Agent.findById(agent1._id)
    expect(agent.companies.length).to.equal(1)
  })

  it('completed agent must appear in company.agents', async () => {
    await agentAccept(agent1Token, company1)
    const company = await Company.findById(company1._id)
    expect(company.agents.length).to.equal(1)
  })
})
