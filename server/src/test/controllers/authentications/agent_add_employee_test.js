import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../app'

const Agent = mongoose.model('Agent')
const { password } = require('../../../helpers/mock')
const { comparePassword } = require('../../../helpers/authentication')

describe('Agent add employee', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const employee1Props = {
    email: 'employee1@test.com',
    password: '1234',
    name: 'name_test',
    phoneNumber: '024283192',
  }

  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    agent1.save()
      .then(() => {
        request(app)
          .post('/agents/signin')
          .send(agent1SigninProps)
          .end((err, res) => {
            agent1Token = res.body.token

            done()
          })
      })
  })

  it('one employee', done => {
    request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findById(agent1._id)
          .then(agent => {
            expect(agent.employees.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

  it('must provide email and password', done => {
    const employeeWithoutEmail = {
      email: undefined,
      password: '1234',
    }
    const employeeWithoutPassword = {
      email: 'employee1@test.com',
      password: undefined,
    }
    request(app)
      .post('/agents/employees')
      .send(employeeWithoutEmail)
      .set('authorization', agent1Token)
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.error).to.equal('Must provide email and password')
        return request(app)
          .post('/agents/employees')
          .send(employeeWithoutPassword)
          .set('authorization', agent1Token)
          .expect(422)
          .end((err1, res1) => {
            if (err1) return done(err1)

            expect(res1.body.error).to.equal('Must provide email and password')
            return Agent
              .findById(agent1._id)
              .then(agent => {
                expect(agent.employees.length).to.equal(0)
                done()
              })
              .catch(done)
          })
      })
  })

  it('can not be use a duplicate email', done => {
    request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/agents/employees')
          .send(employee1Props)
          .set('authorization', agent1Token)
          .expect(422)
          .end((err1, res) => {
            if (err1) return done(err1)

            expect(res.body.error).to.equal('Email is in use')
            return Agent
              .findById(agent1._id)
              .then(agent => {
                expect(agent.employees.length).to.equal(1)
                done()
              })
              .catch(done)
          })
      })
  })

  it('password must be hash', done => {
    request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .expect(201)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findOne({ email: agent1Props.email })
          .then(agent => {
            expect(agent.employees[0].password).to.not.equal(employee1Props.password)
            done()
          })
          .catch(done)
      })
  })

  it('comparePassword must be valid', done => {
    request(app)
      .post('/agents/employees')
      .send(employee1Props)
      .set('authorization', agent1Token)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findById(agent1._id)
          .then(agent => {
            const employee = agent.employees[0]

            comparePassword('1234', employee.password)
              .then(isMatch => {
                expect(isMatch).to.equal(true)
                done()
              })
              .catch(done)
          })
      })
  })
})
