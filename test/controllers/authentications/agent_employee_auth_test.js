const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const { password } = require('../../../helpers/mock')

describe('agent employee authentication', () => {

  let agent1, agent1Token

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

  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent', password: password.raw })
  const employee1SigninProps = {
    email: 'agent1@test.com..employee1@test.com',
    password: '1234',
    role: 'agentEmployee'
  }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    agent1.save()
      .then(() => {
        request(app)
          .post('/agents/signin')
          .send(agent1SigninProps)
          .end((err, res) => {
            agent1Token = res.body.token

            request(app)
              .post('/agents/employees')
              .send(employee1Props)
              .set('authorization', agent1Token)
              .expect(201, done)
          })
      })
  })

  it('signin must return token in body', done => {
    request(app)
      .post('/agents-employees/signin')
      .send(employee1SigninProps)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.token).to.be.exist
        done()
      })
  })

  it('signin token can get secret route', done => {
    request(app)
      .post('/agents-employees/signin')
      .send(employee1SigninProps)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const token = res.body.token
        request(app)
          .get('/agents-employees/profile')
          .set('authorization', token)
          .expect(200, done)
      })
  })

  it('fake token can not get secret route', done => {
      const token = 'fake token'
      request(app)
        .get('/agents-employees/profile')
        .set('authorization', token)
        .expect(401, done)
    })
})
