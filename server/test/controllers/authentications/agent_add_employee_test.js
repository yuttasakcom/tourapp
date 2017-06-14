import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'
import { comparePassword } from '../../../src/helpers/authentication'

const Agent = mongoose.model('Agent')

describe('Agent add employee', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
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
    password: password.raw
  }

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    await agent1.save()
    const { body: { token } } = await request(app)
      .post('/agents/signin')
      .send(agent1SigninProps)

    agent1Token = token
  })

  it('one employee', async () => {
    await request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)

    const agent = await Agent.findById(agent1._id)
    expect(agent.employees.length).to.equal(1)
  })

  it('must provide email and password', async () => {
    const employeeWithoutEmail = {
      email: undefined,
      password: '1234'
    }
    const employeeWithoutPassword = {
      email: 'employee1@test.com',
      password: undefined
    }
    const res = await request(app)
      .post('/agents/employees')
      .send(employeeWithoutEmail)
      .set('authorization', agent1Token)
      .expect(422)

    expect(res.body.error).to.equal('Must provide email and password')

    const res1 = await request(app)
      .post('/agents/employees')
      .send(employeeWithoutPassword)
      .set('authorization', agent1Token)
      .expect(422)

    expect(res1.body.error).to.equal('Must provide email and password')
    const agent = await Agent.findById(agent1._id)
    expect(agent.employees.length).to.equal(0)
  })

  it('can not be use a duplicate email', async () => {
    await request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)

    const res = await request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(422)

    expect(res.body.error).to.equal('Email is in use')
    const agent = await Agent.findById(agent1._id)
    expect(agent.employees.length).to.equal(1)
  })

  it('password must be hash', async () => {
    await request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)

    const agent = await Agent.findOne({ email: agent1Props.email })
    expect(agent.employees[0].password).to.not.equal(employee1Props.password)
  })

  it('comparePassword must be valid', async () => {
    await request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)

    const agent = await Agent.findById(agent1._id)
    const employee = agent.employees[0]
    const isMatch = await comparePassword('1234', employee.password)
    expect(isMatch).to.equal(true)
  })
})
