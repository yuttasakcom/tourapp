const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../../helpers')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent pendings list', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash
  }

  const agent1SigninProps = Object.assign({}, agent1Props, {
    role: 'agent',
    password: h.password.raw
  })

  beforeEach(async () => {
    const company1Stub = new Company({
      email: 'company1stub@test.com',
      password: h.password.hash
    })

    const company2Stub = new Company({
      email: 'company2Stub@test.com',
      password: h.password.hash
    })
    agent1 = new Agent(agent1Props)
    agent1.requestPendings.push(company1Stub)
    agent1.requestPendings.push(company2Stub)
    agent1.acceptPendings.push(company1Stub)
    agent1.acceptPendings.push(company2Stub)

    await Promise.all([agent1.save(), company1Stub.save(), company2Stub.save()])
    const res = await h.agentSignIn(agent1SigninProps)
    agent1Token = res.body.token
  })

  it('two company must appear on GET /agents/request-pendings', async () => {
    const res = await h.agentGetRequestPendings(agent1Token)
    expect(res.body.requestPendings.length).to.equal(2)
  })

  it('two company must appear on GET /agents/accept-pendings', async () => {
    const res = await h.agentGetAcceptPendings(agent1Token)
    expect(res.body.acceptPendings.length).to.equal(2)
  })
})
