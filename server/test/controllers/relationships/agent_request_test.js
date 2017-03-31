import request from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'
import app from '../../../app'
import { password } from '../../../helpers/mock'

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent request', () => {
  let agent1
  let company1
  let company2
  let agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: password.hash,
  }

  const company1Props = {
    email: 'company1@test.com',
    password: password.hash,
  }


  const company2Props = {
    email: 'company2@test.com',
    password: password.hash,
  }

  const agent1SigninProps = {...agent1Props, role: 'agent', password: password.raw }
  const company1SigninProps = {...company1Props, role: 'company', password: password.raw }

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    Promise
      .all([
        agent1.save(),
        company1.save(),
        company2.save(),
      ])
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

  it('must be appear on agent request pendings', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Agent
          .findById(agent1._id)
          .then(agent => {
            expect(agent.requestPendings.length).to.equal(1)
            expect(agent.requestPendings[0].toString()).to.equal(company1._id.toString())
            done()
          })
          .catch(done)
      })
  })

  it('cancel request must remove agent requestPendings and company acceptPendings', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .delete(`/agents/cancel-request/${company1._id}`)
          .set('authorization', agent1Token)
          .expect(200)
          .end(err1 => {
            if (err1) return done(err1)

            return Promise
              .all([
                Agent.findById(agent1._id),
                Company.findById(company1._id),
              ])
              .then(results => {
                expect(results[0].requestPendings.length).to.equal(0)
                expect(results[1].acceptPendings.length).to.equal(0)
                done()
              })
              .catch(done)
          })
      })
  })

  it('reject request must remove agent acceptPendings and company requestPendings', done => {
    request(app)
      .post('/companies/signin')
      .send(company1SigninProps)
      .end((err, res) => {
        if (err) return done(err)

        const company1Token = res.body.token
        return request(app)
          .post('/companies/request')
          .send({ _id: agent1._id })
          .set('authorization', company1Token)
          .end(err1 => {
            if (err1) return done(err1)

            return request(app)
              .delete(`/agents/reject-request/${company1._id}`)
              .set('authorization', agent1Token)
              .expect(200)
              .end(err2 => {
                if (err2) return done(err1)

                return Promise
                  .all([
                    Agent.findById(agent1._id),
                    Company.findById(company1._id),
                  ])
                  .then(results => {
                    expect(results[0].acceptPendings.length).to.equal(0)
                    expect(results[1].requestPendings.length).to.equal(0)
                    done()
                  })
                  .catch(done)
              })
          })
      })
  })

  it('must be appear on company accept pendings', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return Company
          .findById(company1._id)
          .then(company => {
            expect(company.acceptPendings.length).to.equal(1)
            expect(company.acceptPendings[0].toString()).to.equal(agent1._id.toString())
            done()
          })
          .catch(done)
      })
  })

  it('duplicate company must return status 422 and not insert', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/agents/request')
          .send({ _id: company1._id })
          .set('authorization', agent1Token)
          .expect(422)
          .end(err1 => {
            if (err1) return done(err1)

            return Promise
              .all([
                Agent.findById(agent1._id),
                Company.findById(company1._id),
              ])
              .then(result => {
                expect(result[0].requestPendings.length).to.equal(1)
                expect(result[1].acceptPendings.length).to.equal(1)
                done()
              })
              .catch(done)
          })
      })
  })

  it('two company', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/agents/request')
          .send({ _id: company2._id })
          .set('authorization', agent1Token)
          .expect(200)
          .end(err1 => {
            if (err1) return done(err1)

            return Promise
              .all([
                Agent.findById(agent1._id),
                Company.findById(company1._id),
                Company.findById(company2._id),
              ])
              .then(result => {
                expect(result[0].requestPendings.length).to.equal(2)
                expect(result[1].acceptPendings.length).to.equal(1)
                expect(result[2].acceptPendings.length).to.equal(1)
                done()
              })
              .catch(done)
          })
      })
  })

  it('already member must return status 422', done => {
    request(app)
      .post('/agents/request')
      .send({ _id: company1._id })
      .set('authorization', agent1Token)
      .expect(200)
      .end(err => {
        if (err) return done(err)

        return request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .expect(200)
          .end((err1, res1) => {
            if (err1) return done(err1)

            const company1Token = res1.body.token
            return request(app)
              .post('/companies/accept')
              .send({ _id: agent1._id })
              .set('authorization', company1Token)
              .expect(200)
              .end(err2 => {
                if (err2) return done(err2)

                return request(app)
                  .post('/agents/request')
                  .send({ _id: company1._id })
                  .set('authorization', agent1Token)
                  .expect(422)
                  .end(err3 => {
                    if (err3) return done(err3)

                    return done()
                  })
              })
          })
      })
  })
})
