const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')

describe.only('Agent create employee', () => {

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
    console.log(agent1Token)

    done()
  })

})