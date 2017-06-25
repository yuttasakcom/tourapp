import { expect } from 'chai'
import mongoose from 'mongoose'
import * as h from '../../helpers'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company pendings list', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: h.password.hash
  }

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: h.password.raw
  }

  beforeEach(async () => {
    const agent1Stub = new Agent({
      email: 'agent1stub@test.com',
      password: h.password.hash
    })

    const agent2Stub = new Agent({
      email: 'agent2stub@test.com',
      password: h.password.hash
    })
    company1 = new Company(company1Props)
    company1.requestPendings.push(agent1Stub)
    company1.requestPendings.push(agent2Stub)
    company1.acceptPendings.push(agent1Stub)
    company1.acceptPendings.push(agent2Stub)
    await Promise.all([company1.save(), agent1Stub.save(), agent2Stub.save()])
    const res = await h.companySignIn(company1SigninProps)
    company1Token = res.body.token
  })

  it('two agent must appear on GET /companies/request-pendings', async () => {
    const res = await h.companyGetRequestPendings(company1Token)
    expect(res.body.requestPendings.length).to.equal(2)
  })

  it('two agent must appear on GET /companies/accept-pendings', async () => {
    const res = await h.companyGetAcceptPendings(company1Token)
    expect(res.body.acceptPendings.length).to.equal(2)
  })
})
