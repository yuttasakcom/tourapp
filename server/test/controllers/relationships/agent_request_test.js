import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent request', () => {
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
  const company1SigninProps = {
    ...company1Props,
    role: 'company',
    password: password.raw
  }

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    await Promise.all([agent1.save(), company1.save(), company2.save()])
    const res = await request(app)
      .post('/agents/signin')
      .send(agent1SigninProps)

    agent1Token = res.body.token
  })

  it('must be appear on agent request pendings', async () => {
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    const agent = await Agent.findById(agent1._id)
    expect(agent.requestPendings.length).to.equal(1)
    expect(agent.requestPendings[0].toString()).to.equal(
      company1._id.toString()
    )
  })

  it('cancel request must remove agent requestPendings and company acceptPendings', async () => {
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    await request(app)
      .delete(`/agents/cancel-request/${company1._id}`)
      .set('authorization', agent1Token)
      .expect(200)

    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.requestPendings.length).to.equal(0)
    expect(res2.acceptPendings.length).to.equal(0)
  })

  it('reject request must remove agent acceptPendings and company requestPendings', async () => {
    const res = await request(app)
      .post('/companies/signin')
      .send(company1SigninProps)
    const company1Token = res.body.token

    await request(app)
      .post('/companies/request')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)

    await request(app)
      .delete(`/agents/reject-request/${company1._id}`)
      .set('authorization', agent1Token)
      .expect(200)

    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.acceptPendings.length).to.equal(0)
    expect(res2.requestPendings.length).to.equal(0)
  })

  it('must be appear on company accept pendings', async () => {
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    const company = await Company.findById(company1._id)
    expect(company.acceptPendings.length).to.equal(1)
    expect(company.acceptPendings[0].toString()).to.equal(agent1._id.toString())
  })

  it('duplicate company must return status 422 and not insert', async () => {
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(422)

    const [res1, res2] = await Promise.all([
      Agent.findById(agent1._id),
      Company.findById(company1._id)
    ])
    expect(res1.requestPendings.length).to.equal(1)
    expect(res2.acceptPendings.length).to.equal(1)
  })

  it('two company', async () => {
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    await request(app)
      .post('/agents/request')
      .send({ _id: company2._id })
      .set('authorization', agent1Token)
      .expect(200)

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
    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)

    const res = await request(app)
      .post('/companies/signin')
      .send(company1SigninProps)
      .expect(200)

    const company1Token = res.body.token
    await request(app)
      .post('/companies/accept')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)

    await request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(422)
  })
})
