const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const { password } = require('../../../helpers/mock')

describe.only('Agent employee booking', () => {

  let agentEmployee1Token

  const agentEmployee1Props = {
    email: 'agentemployee1@test.com',
    password: password.hash,
    name: 'name_test',
    phoneNumber: '024283192'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
    employees: [agentEmployee1Props]
  }

  const agentEmployee1SigninProps = {
    email: 'agent1@test.com..agentemployee1@test.com',
    password: password.raw,
    role: 'agentEmployee'
  }

  beforeEach(done => {
    const agent1 = new Agent(agent1Props)
    agent1.save()
      .then(() => {

        request(app)
          .post('/agents-employees/signin')
          .send(agentEmployee1SigninProps)
          .end((err, res) => {
            agentEmployee1Token = res.body.token

            done()
          })
      })
  })

  it('one booking', done => {
    console.log(agentEmployee1Token)

    done()
  })

})
