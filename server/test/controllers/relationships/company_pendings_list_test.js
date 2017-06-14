import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company pendings list', () => {
  let company1
  let company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash
  }

  const agent1Stub = new Agent({
    email: 'agent1stub@test.com',
    password: password.hash
  })

  const agent2Stub = new Agent({
    email: 'agent2stub@test.com',
    password: password.hash
  })

  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: password.raw
  }

  beforeEach(async () => {
    company1 = new Company(company1Props)
    company1.requestPendings.push(agent1Stub)
    company1.requestPendings.push(agent2Stub)
    company1.acceptPendings.push(agent1Stub)
    company1.acceptPendings.push(agent2Stub)
    await company1.save()
    const res = await request(app)
      .post('/companies/signin')
      .send(company1SigninProps)

    company1Token = res.body.token
  })

  it('two agent must appear on GET /companies/request-pendings', async () => {
    const res = await request(app)
      .get('/companies/request-pendings')
      .set('authorization', company1Token)
      .expect(200)

    expect(res.body.requestPendings.length).to.equal(2)
  })

  it('two agent must appear on GET /companies/accept-pendings', async () => {
    const res = await request(app)
      .get('/companies/accept-pendings')
      .set('authorization', company1Token)
      .expect(200)

    expect(res.body.acceptPendings.length).to.equal(2)
  })
})
