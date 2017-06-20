import chai from 'chai'
import mongoose from 'mongoose'
import dirtyChai from 'dirty-chai'
import * as h from '../../helpers'

chai.use(dirtyChai)

const expect = chai.expect
const Agent = mongoose.model('Agent')

describe('agent employee authentication', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: h.password.hash
  }

  const employee1Props = {
    email: 'employee1@test.com',
    password: '1234',
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1SigninProps = {
    ...agent1Props,
    role: 'agent',
    password: h.password.raw
  }

  const employee1SigninProps = {
    email: 'agent1@test.com..employee1@test.com',
    password: '1234',
    role: 'agentEmployee'
  }

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    await agent1.save()
    const res = await h.agentSignIn(agent1SigninProps)
    agent1Token = res.body.token
    await h.agentAddEmployee(agent1Token, employee1Props).expect(201)
  })

  it('signin must return token in body', async () => {
    const res = await h.agentEmployeeSignIn(employee1SigninProps).expect(200)
    expect(res.body.token).to.be.exist()
  })

  it('return status 401 when dont send role', async () => {
    await h.agentEmployeeSignIn(employee1Props).expect(401)
  })

  it('signin token can get secret route', async () => {
    const res = await h.agentEmployeeSignIn(employee1SigninProps).expect(200)
    const token = res.body.token
    await h.agentEmployeeGetProfile(token).expect(200)
  })

  it('fake token can not get secret route', async () => {
    const token = 'fake token'
    await h.agentEmployeeGetProfile(token).expect(401)
  })
})
