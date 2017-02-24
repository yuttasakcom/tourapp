const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')

describe.only('Agent add employee', () => {

  let agent1, agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
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
      .send({
        email: 'employee1@test.com',
        password: '1234',
        name: 'name_test',
        phoneNumber: '024283192'
      })
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

})
