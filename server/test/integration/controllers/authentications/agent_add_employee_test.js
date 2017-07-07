const { expect } = require('chai')
const mongoose = require('mongoose')
const { comparePassword } = require('../../../../src/helpers/authentication')
const h = require('../../helpers')

const Agent = mongoose.model('Agent')

describe('Agent add employee', () => {
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

  const agent1SigninProps = Object.assign({}, agent1Props, {
    role: 'agent',
    password: h.password.raw
  })

  beforeEach(async () => {
    agent1 = new Agent(agent1Props)
    await agent1.save()
    const { body: { token } } = await h.agentSignIn(agent1SigninProps)
    agent1Token = token
  })

  it('one employee', async () => {
    await h.agentAddEmployee(agent1Token, employee1Props).expect(201)
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
    const res = await h
      .agentAddEmployee(agent1Token, employeeWithoutEmail)
      .expect(422)

    expect(res.body.error).to.equal('Must provide email and password')
    const res1 = await h
      .agentAddEmployee(agent1Token, employeeWithoutPassword)
      .expect(422)

    expect(res1.body.error).to.equal('Must provide email and password')
    const agent = await Agent.findById(agent1._id)
    expect(agent.employees.length).to.equal(0)
  })

  it('can not be use a duplicate email', async () => {
    await h.agentAddEmployee(agent1Token, employee1Props).expect(201)
    const res = await h
      .agentAddEmployee(agent1Token, employee1Props)
      .expect(422)
    expect(res.body.error).to.equal('Email is in use')
    const agent = await Agent.findById(agent1._id)
    expect(agent.employees.length).to.equal(1)
  })

  it('password must be hash', async () => {
    await h.agentAddEmployee(agent1Token, employee1Props).expect(201)
    const agent = await Agent.findOne({ email: agent1Props.email })
    expect(agent.employees[0].password).to.not.equal(employee1Props.password)
  })

  it('comparePassword must be valid', async () => {
    await h.agentAddEmployee(agent1Token, employee1Props)
    const agent = await Agent.findById(agent1._id)
    const employee = agent.employees[0]
    const isMatch = await comparePassword('1234', employee.password)
    expect(isMatch).to.equal(true)
  })
})
