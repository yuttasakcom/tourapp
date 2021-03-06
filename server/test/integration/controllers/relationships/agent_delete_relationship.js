const { expect } = require('chai')
const mongoose = require('mongoose')
const h = require('../../helpers')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent delete relationship', () => {
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

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    agent1.companies.push(company1)
    agent1.companies.push(company2)
    company1.agents.push(agent1)
    company1.agents.push(agent1)

    await Promise.all([agent1.save(), company1.save(), company2.save()])
    const res = await h.agentSignIn(agent1SigninProps)

    agent1Token = res.body.token
  })

  it('one relationship', async () => {
    await h.agentDeleteRelationship(agent1Token, company1)
    const [res1, res2, res3] = await Promise.all([
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
    expect(res1).to.equal(null)
    expect(res2).to.equal(null)
    expect(res3.companies.length).to.equal(1)
  })

  it('two relationship', async () => {
    await Promise.all([
      h.agentDeleteRelationship(agent1Token, company1),
      h.agentDeleteRelationship(agent1Token, company2)
    ])

    const [res1, res2, res3] = await Promise.all([
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
    expect(res1).to.equal(null)
    expect(res2).to.equal(null)
    expect(res3).to.equal(null)
  })
})
