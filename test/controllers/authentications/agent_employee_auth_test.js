const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const password = require('../../../helpers/password')

describe.only('agent employee authentication', () => {

  let agent1, agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash
  }

  const employee1Props = {
    email: 'employee@test.com',
    password: '1234',
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent', password: password.raw })

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
  	done()
  })

})
