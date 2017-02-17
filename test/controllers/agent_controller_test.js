const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')

describe('agent authentication', () => {

	const agentProps = {
      email: 'agent1@test.com',
      password: '1234'
    }

  describe.only('signup', () => {

    it('create a new agent', done => {
      Agent.count().then(count => {
        request(app)
          .post('/agents/signup')
          .send(agentProps)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err)

            Agent.count().then(newCount => {
              expect(count + 1).to.equal(newCount)
              done()
            })
          })
      })
    })

    it('must provide email and password', done => {
      const agentWithoutEmail = {
        email: undefined,
        password: '1234'
      }
      const agentWithoutPassword = {
        email: 'agent1@test.com',
        password: undefined
      }
      request(app)
        .post('/agents/signup')
        .send(agentWithoutEmail)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.error).to.equal('Must provide email or password')
          request(app)
            .post('/agents/signup')
            .send(agentWithoutPassword)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err)

              expect(res.body.error).to.equal('Must provide email or password')
              done()
            })
        })
    })
  })

})
