import request from 'supertest'
import chai from 'chai'
import mongoose from 'mongoose'
import dirtyChai from 'dirty-chai'
import app from '../../../src/app'
import { password } from '../../../src/helpers/mock'

chai.use(dirtyChai)

const expect = chai.expect
const Agent = mongoose.model('Agent')

describe('agent employee authentication', () => {
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
  const employee1SigninProps = {
    email: 'agent1@test.com..employee1@test.com',
    password: '1234',
    role: 'agentEmployee',
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

        expect(res.body.token).to.be.exist()
        return done()
      })
  })

  it('return status 401 when dont send role', done => {
    request(app)
      .post('/agents-employees/signin')
      .send(employee1Props)
      .expect(401, done)
  })

  it('signin token can get secret route', done => {
    request(app)
      .post('/agents-employees/signin')
      .send(employee1SigninProps)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const token = res.body.token
        return request(app)
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
