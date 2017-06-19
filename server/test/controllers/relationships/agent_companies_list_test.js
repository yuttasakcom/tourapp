import { expect } from 'chai'
import mongoose from 'mongoose'
import { password, agentSignIn, agentGetCompanies } from '../../helpers'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent get companies list', () => {
  let agent1
  let company1
  let company2
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const company2Props = {
    email: 'company2@test.com',
    password: password.hash
  }

  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: password.raw
  }

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    agent1.companies.push(company1)
    agent1.companies.push(company2)

    await Promise.all([agent1.save(), company1.save(), company2.save()])
    const res = await agentSignIn(agent1SigninProps)
    agent1Token = res.body.token
  })

  it('two companies', async () => {
    const res = await agentGetCompanies(agent1Token).expect(200)
    const companies = res.body
    expect(companies.length).to.equal(2)
    expect(companies[0].email).to.equal(company1Props.email)
    expect(companies[1].email).to.equal(company2Props.email)
  })
})
