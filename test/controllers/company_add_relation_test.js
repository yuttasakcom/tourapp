const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Company add relation', () => {

  let company1, agent1, agent2, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const agent2Props = {
    email: 'agent2@test.com',
    password: '1234'
  }

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {
    company1 = new Company(company1Props)
    agent1 = new Agent(agent1Props)
    agent2 = new Agent(agent2Props)

    Promise.all([
        company1.save(),
        agent1.save(),
        agent2.save()
      ])
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            company1Token = res.body.token

            done()
          })
      })
  })

  it('one agent', done => {
    request(app)
      .post('/companies/agents')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Promise.all([
            Company.findById(company1._id),
            Agent.findById(agent1._id)
          ])
          .then(result => {
            expect(result[0].agents.length).to.equal(1)
            expect(result[1].companies.length).to.equal(1)
            done()
          })
          .catch(done)
      })
  })

  it('two agent', done => {
    request(app)
      .post('/companies/agents')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/companies/agents')
          .send({ _id: agent2._id })
          .set('authorization', company1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Company.findById(company1._id),
                Agent.findById(agent1._id),
                Agent.findById(agent2._id)
              ])
              .then(result => {
                expect(result[0].agents.length).to.equal(2)
                expect(result[1].companies.length).to.equal(1)
                expect(result[2].companies.length).to.equal(1)
                done()
              })
              .catch(done)
          })
      })
  })

  it('duplicate agent must return status 422 and not insert', done => {
    request(app)
      .post('/companies/agents')
      .send({ _id: agent1._id })
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/companies/agents')
          .send({ _id: agent1._id })
          .set('authorization', company1Token)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Company.findById(company1._id),
                Agent.findById(agent1._id),
                Agent.findById(agent2._id)
              ])
              .then(result => {
                expect(result[0].agents.length).to.equal(1)
                expect(result[1].companies.length).to.equal(1)
                expect(result[2].companies.length).to.equal(0)
                done()
              })
              .catch(done)
          })
      })
  })

})
