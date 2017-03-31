import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../app'
import { password } from '../../../helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent pendings list', () => {
  let agent1
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1Stub = new Company({
    email: 'company1stub@test.com',
    password: password.hash,
  })

  const company2Stub = new Company({
    email: 'company2Stub@test.com',
    password: password.hash,
  })

  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    agent1.requestPendings.push(company1Stub)
    agent1.requestPendings.push(company2Stub)
    agent1.acceptPendings.push(company1Stub)
    agent1.acceptPendings.push(company2Stub)

    agent1.save()
      .then(() => {
        request(app)
          .post('/agents/signin')
          .send(agent1SigninProps)
          .end((err, res) => {
            if (err) return done(err)

            agent1Token = res.body.token
            return done()
          })
      })
  })

  it('two company must appear on GET /agents/request-pendings', done => {
    request(app)
      .get('/agents/request-pendings')
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.requestPendings.length).to.equal(2)
        return done()
      })
  })

  it('two company must appear on GET /agents/accept-pendings', done => {
    request(app)
      .get('/agents/accept-pendings')
      .set('authorization', agent1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.acceptPendings.length).to.equal(2)
        return done()
      })
  })
})
