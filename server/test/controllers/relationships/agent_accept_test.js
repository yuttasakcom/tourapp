import request from 'supertest'
import chai from 'chai'
import { parallel } from 'async'
import mongoose from 'mongoose'
import app from '../../../app'
import { password } from '../../../helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

const expect = chai.expect

describe('Agent accept', () => {
  let company1
  let agent1
  let company1Token
  let agent1Token

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1SigninProps = {...company1Props, role: 'company', password: password.raw }
  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }

  beforeEach(done => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)

    Promise
      .all([
        company1.save(),
        agent1.save(),
      ])
      .then(() => {
        parallel(
          [
            cb => {
              request(app)
                .post('/companies/signin')
                .send(company1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
            cb => {
              request(app)
                .post('/agents/signin')
                .send(agent1SigninProps)
                .end((err, res) => {
                  cb(err, res.body.token)
                })
            },
          ],
          (err, results) => {
            company1Token = results[0]
            agent1Token = results[1]
            request(app)
              .post('/companies/request')
              .send({ _id: agent1._id })
              .set('authorization', company1Token)
              .end(err1 => {
                if (err1) return done(err1)

                return done()
              })
          })
      })
  })

  it('must remove agent accept pendings', done => {
    request(app)
      .post('/agents/accept')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findById(agent1._id)
          .then(agent => {
            expect(agent.acceptPendings.length).to.equal(0)
            done()
          })
          .catch(done)
      })
  })

  it('must remove company request pendings', done => {
    request(app)
      .post('/agents/accept')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Company
          .findById(company1._id)
          .then(company => {
            expect(company.requestPendings.length).to.equal(0)
            done()
          })
          .catch(done)
      })
  })

  it('duplicate accept must return status 422', done => {
    request(app)
      .post('/agents/accept')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/agents/accept')
          .send({ _id: company1._id })
          .set('authorization', agent1Token)
          .expect(422)
          .end(err1 => {
            if (err1) return done(err1)

            return done()
          })
      })
  })

  it('completed company must appear in agent.companies', done => {
    request(app)
      .post('/agents/accept')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findById(agent1._id)
          .then(agent => {
            expect(agent.companies.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

  it('completed agent must appear in company.agents', done => {
    request(app)
      .post('/agents/accept')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Company
          .findById(company1._id)
          .then(company => {
            expect(company.agents.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })
})
