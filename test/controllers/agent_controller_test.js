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

  describe('signup', () => {

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

          expect(res.body.error).to.equal('Must provide email and password')
          request(app)
            .post('/agents/signup')
            .send(agentWithoutPassword)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err)

              expect(res.body.error).to.equal('Must provide email and password')
              done()
            })
        })
    })

    it('can not be use a duplicate email', done => {
      const agent = new Agent(agentProps)

      agent.save().then(() => {
        request(app)
          .post('/agents/signup')
          .send(agentProps)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            expect(res.body.error).to.equal('Email is in use')
            done()
          })
      })
    })

    it('password must be hash', done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          Agent.findOne({ email: agentProps.email })
            .then(agent => {
              expect(agent.password).to.not.equal(agentProps.password)
              done()
            })
            .catch(done)
        })
    })

    it('return token in body', done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.token).to.be.exist
          done()
        })
    })
  })

})
