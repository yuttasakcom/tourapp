import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent pendings list', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
  }

  const company1Stub = new Company({
    email: 'company1stub@test.com',
    password: password.hash
  })

  const company2Stub = new Company({
    email: 'company2Stub@test.com',
    password: password.hash
  })

  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: password.raw
  }

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    agent1.requestPendings.push(company1Stub)
    agent1.requestPendings.push(company2Stub)
    agent1.acceptPendings.push(company1Stub)
    agent1.acceptPendings.push(company2Stub)

    await agent1.save()
    const res = await request(app)
      .post('/agents/signin')
      .send(agent1SigninProps)

    agent1Token = res.body.token
  })

  it('two company must appear on GET /agents/request-pendings', async () => {
    const res = await request(app)
      .get('/agents/request-pendings')
      .set('authorization', agent1Token)
      .expect(200)

    expect(res.body.requestPendings.length).to.equal(2)
  })

  it('two company must appear on GET /agents/accept-pendings', async () => {
    const res = await request(app)
      .get('/agents/accept-pendings')
      .set('authorization', agent1Token)
      .expect(200)

    expect(res.body.acceptPendings.length).to.equal(2)
  })
})
