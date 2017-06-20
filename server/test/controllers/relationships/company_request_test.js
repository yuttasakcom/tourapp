import { expect } from 'chai'
import mongoose from 'mongoose'
import * as h from '../../helpers'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company request', () => {
  let company1
  let agent1
  let agent2
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash
  }

  const agent2Props = {
    email: 'agent2@test.com',
    password: h.password.hash
  }

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: h.password.raw
  }
  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: h.password.raw
  }

  beforeEach(async () => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

    await Promise.all([company1.save(), agent1.save(), agent2.save()])
    const res = await h.companySignIn(company1SigninProps)
    company1Token = res.body.token
  })

  it('must be appear on company request pendings', async () => {
    await h.companyRequest(company1Token, agent1).expect(200)
    const company = await Company.findById(company1._id)
    expect(company.requestPendings.length).to.equal(1)
    expect(company.requestPendings[0].toString()).to.equal(
      agent1._id.toString()
    )
  })

  it('cancel request must remove company requestPendings and agent acceptPendings', async () => {
    await h.companyRequest(company1Token, agent1).expect(200)
    await h.companyCancelRequest(company1Token, agent1).expect(200)
    const [res1, res2] = await Promise.all([
      Company.findById(company1._id),
      Agent.findById(agent1._id)
    ])
    expect(res1.requestPendings.length).to.equal(0)
    expect(res2.acceptPendings.length).to.equal(0)
  })

  it('reject request must remove company acceptPendings and agent requestPendings', async () => {
    const res = await h.agentSignIn(agent1SigninProps)
    const agent1Token = res.body.token

    await h.agentRequest(agent1Token, company1)
    await h.companyRejectRequest(company1Token, agent1)

    const [res1, res2] = await Promise.all([
      Company.findById(company1._id),
      Agent.findById(agent1._id)
    ])
    expect(res1.acceptPendings.length).to.equal(0)
    expect(res2.requestPendings.length).to.equal(0)
  })

  it('must be appear on agent accept pendings', async () => {
    await h.companyRequest(company1Token, agent1)
    const agent = await Agent.findById(agent1._id)
    expect(agent.acceptPendings.length).to.equal(1)
    expect(agent.acceptPendings[0].toString()).to.equal(company1._id.toString())
  })

  it('duplicate agent must return status 422 and not insert', async () => {
    await h.companyRequest(company1Token, agent1).expect(200)
    await h.companyRequest(company1Token, agent1).expect(422)
    const [res1, res2] = await Promise.all([
      Company.findById(company1._id),
      Agent.findById(agent1._id)
    ])
    expect(res1.requestPendings.length).to.equal(1)
    expect(res2.acceptPendings.length).to.equal(1)
  })

  it('two agent', async () => {
    await h.companyRequest(company1Token, agent1).expect(200)
    await h.companyRequest(company1Token, agent2).expect(200)
    const [res1, res2, res3] = await Promise.all([
      Company.findById(company1._id),
      Agent.findById(agent1._id),
      Agent.findById(agent2._id)
    ])
    expect(res1.requestPendings.length).to.equal(2)
    expect(res2.acceptPendings.length).to.equal(1)
    expect(res3.acceptPendings.length).to.equal(1)
  })

  it('already member must return status 422', async () => {
    await h.companyRequest(company1Token, agent1).expect(200)
    const res = await h.agentSignIn(agent1SigninProps)
    const agent1Token = res.body.token
    await h.agentAccept(agent1Token, company1).expect(200)
    await h.companyRequest(company1Token, agent1).expect(422)
  })
})
