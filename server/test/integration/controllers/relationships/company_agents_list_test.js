const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../../helpers')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company get empty agents list', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash,
    name: 'company1'
  }

  const company1SigninProps = Object.assign({}, company1Props, {
    role: 'company',
    password: h.password.raw
  })

  beforeEach(async () => {
    company1 = new Company(company1Props)
    await company1.save()
    const res = await h.companySignIn(company1SigninProps)
    company1Token = res.body.token
  })

  it('empty agents', async () => {
    const res = await h.companyGetAgents(company1Token)
    const agents = res.body
    expect(agents.length).to.equal(0)
  })
})

describe('Company get agents list', () => {
  let company1
  let agent1
  let agent2
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash,
    name: 'company1'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash,
    name: 'agent1'
  }

  const agent2Props = {
    email: 'agent2@test.com',
    password: h.password.hash,
    name: 'agent2'
  }

  const company1SigninProps = Object.assign({}, company1Props, {
    role: 'company',
    password: h.password.raw
  })

  beforeEach(async () => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

    company1.agents.push(agent1)
    company1.agents.push(agent2)

    await Promise.all([company1.save(), agent1.save(), agent2.save()])
    const res = await h.companySignIn(company1SigninProps)
    company1Token = res.body.token
  })

  it('two agents', async () => {
    const res = await h.companyGetAgents(company1Token)
    const agents = res.body
    expect(agents.length).to.equal(2)
    expect(agents[0].email).to.equal(agent1Props.email)
    expect(agents[1].email).to.equal(agent2Props.email)
  })
})
