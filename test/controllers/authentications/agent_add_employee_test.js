const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')

describe('Agent add employee', () => {

  let agent1, agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const employee1Props = {
    email: 'employee@test.com',
    password: '1234',
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent' })

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
      .end((err, res) => {
        if (err) return done(err)

        Agent.findById(agent1._id)
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
      password: '1234'
    }
    const employeeWithoutPassword = {
      email: 'employee1@test.com',
      password: undefined
    }
    request(app)
      .post('/agents/employees')
      .send(employeeWithoutEmail)
      .set('authorization', agent1Token)
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.error).to.equal('Must provide email and password')
        request(app)
          .post('/agents/employees')
          .send(employeeWithoutPassword)
          .set('authorization', agent1Token)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            expect(res.body.error).to.equal('Must provide email and password')
            Agent.findById(agent1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/agents/employees')
          .send(employee1Props)
          .set('authorization', agent1Token)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            expect(res.body.error).to.equal('Email is in use')
            Agent.findById(agent1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        Agent.findOne({ email: agent1Props.email })
          .then(agent => {
            expect(agent.employees[0].password).to.not.equal(employee1Props.password)
            done()
          })
          .catch(done)
      })
  })

})
