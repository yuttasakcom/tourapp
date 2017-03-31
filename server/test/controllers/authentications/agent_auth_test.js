import request from 'supertest'
import dirtyChai from 'dirty-chai'
import chai from 'chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { comparePassword } from '../../../src/helpers/authentication'

chai.use(dirtyChai)

const expect = chai.expect
const Agent = mongoose.model('Agent')

describe('agent authentication', () => {
  const agentProps = {
    email: 'agent1@test.com',
    password: '1234',
  }

  const agentSigninProps = {...agentProps, role: 'agent' }

  describe('signup', () => {
    it('create a new agent', done => {
      Agent.count().then(count => {
        request(app)
          .post('/agents/signup')
          .send(agentProps)
          .expect(201)
          .end(err => {
            if (err) return done(err)

            return Agent
              .count().then(newCount => {
                expect(count + 1).to.equal(newCount)
                done()
              })
          })
      })
    })

    it('must provide email and password', done => {
      const agentWithoutEmail = {
        email: undefined,
        password: '1234',
      }
      const agentWithoutPassword = {
        email: 'agent1@test.com',
        password: undefined,
      }
      request(app)
        .post('/agents/signup')
        .send(agentWithoutEmail)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.error).to.equal('Must provide email and password')
          return request(app)
            .post('/agents/signup')
            .send(agentWithoutPassword)
            .expect(422)
            .end((err1, res1) => {
              if (err1) return done(err1)

              expect(res1.body.error).to.equal('Must provide email and password')
              return done()
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
            return done()
          })
      })
    })

    it('password must be hash', done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .expect(201)
        .end(err => {
          if (err) return done(err)

          return Agent
            .findOne({ email: agentProps.email })
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

          expect(res.body.token).to.be.exist()
          return done()
        })
    })
  })

  describe('signin', () => {
    let testAgent

    beforeEach(done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .end(err => {
          if (err) return done(err)

          return Agent
            .findOne({ email: agentProps.email })
            .then(agent => {
              testAgent = agent
              done()
            })
        })
    })

    it('comparePassword must be valid', done => {
      comparePassword(agentProps.password, testAgent.password)
        .then(isMatch => {
          expect(isMatch).to.equal(true)
          done()
        })
        .catch(done)
    })

    it('comparePassword must be invalid', done => {
      comparePassword('4321', testAgent.password)
        .then(isMatch => {
          expect(isMatch).to.equal(false)
          done()
        })
        .catch(done)
    })

    it('return token in body', done => {
      request(app)
        .post('/agents/signin')
        .send(agentSigninProps)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.token).to.be.exist()
          return done()
        })
    })

    it('return status 401 when dont send role', done => {
      request(app)
        .post('/agents/signin')
        .send(agentProps)
        .expect(401, done)
    })
  })

  describe('auth with jwt', () => {
    it('signup token can get secret route', done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .end((err, res) => {
          if (err) return done(err)

          const token = res.body.token
          return request(app)
            .get('/agents/profile')
            .set('authorization', token)
            .expect(200, done)
        })
    })

    it('signin token can get secret route', done => {
      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .end(err => {
          if (err) return done(err)

          return request(app)
            .post('/agents/signin')
            .send(agentSigninProps)
            .end((err1, res) => {
              if (err1) return done(err1)

              const token = res.body.token
              return request(app)
                .get('/agents/profile')
                .set('authorization', token)
                .expect(200, done)
            })
        })
    })

    it('fake token can not get secret route', done => {
      const token = 'fake token'
      request(app)
        .get('/agents/profile')
        .set('authorization', token)
        .expect(401, done)
    })

    it('company token can not get secret route', done => {
      const companyProps = {
        email: 'company1@test.com',
        password: '1234',
      }

      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          const companyToken = res.body.token
          return request(app)
            .get('/agents/profile')
            .set('authorization', companyToken)
            .expect(401, done)
        })
    })
  })
})
