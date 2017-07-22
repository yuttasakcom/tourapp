const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../../helpers')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent request', () => {
  let agent1
  let company1
  let company2
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash,
    name: 'agent1'
  }

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash,
    name: 'company1'
  }

  const company2Props = {
    email: 'company2@test.com',
    password: h.password.hash,
    name: 'company2'
  }

  const agent1SigninProps = Object.assign({}, agent1Props, {
    role: 'agent',
    password: h.password.raw
  })

  const company1SigninProps = Object.assign({}, company1Props, {
    role: 'company',
    password: h.password.raw
  })

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    await Promise.all([agent1.save(), company1.save(), company2.save()])
    const res = await h.agentSignIn(agent1SigninProps)
    agent1Token = res.body.token
  })

  it('must be appear on agent request pendings', async () => {
    await h.agentRequest(agent1Token, company1)
    const agent = await Agent.findById(agent1._id)
    expect(agent.requestPendings.length).to.equal(1)
    expect(agent.requestPendings[0].toString()).to.equal(
      company1._id.toString()
    )
  })

  it('cancel request must remove agent requestPendings and company acceptPendings', async () => {
    await h.agentRequest(agent1Token, company1)
    await h.agentCancelRequest(agent1Token, company1)
    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.requestPendings.length).to.equal(0)
    expect(res2.acceptPendings.length).to.equal(0)
  })

  it('reject request must remove agent acceptPendings and company requestPendings', async () => {
    const res = await h.companySignIn(company1SigninProps)
    const company1Token = res.body.token

    await h.companyRequest(company1Token, agent1)
    await h.agentRejectRequest(agent1Token, company1)
    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.acceptPendings.length).to.equal(0)
    expect(res2.requestPendings.length).to.equal(0)
  })

  it('must be appear on company accept pendings', async () => {
    await h.agentRequest(agent1Token, company1)
    const company = await Company.findById(company1._id)
    expect(company.acceptPendings.length).to.equal(1)
    expect(company.acceptPendings[0].toString()).to.equal(agent1._id.toString())
  })

  it('duplicate company must return status 422 and not insert', async () => {
    await h.agentRequest(agent1Token, company1).expect(200)
    await h.agentRequest(agent1Token, company1).expect(422)
    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.requestPendings.length).to.equal(1)
    expect(res2.acceptPendings.length).to.equal(1)
  })

  it('two company', async () => {
    await h.agentRequest(agent1Token, company1)
    await h.agentRequest(agent1Token, company2)
    const [res1, res2, res3] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id),
      Company.findById(company2._id)
    ])
    expect(res1.requestPendings.length).to.equal(2)
    expect(res2.acceptPendings.length).to.equal(1)
    expect(res3.acceptPendings.length).to.equal(1)
  })

  it('already member must return status 422', async () => {
    await h.agentRequest(agent1Token, company1)
    const res = await h.companySignIn(company1SigninProps)
    const company1Token = res.body.token
    await h.companyAccept(company1Token, agent1)
    await h.agentRequest(agent1Token, company1).expect(422)
  })
})
