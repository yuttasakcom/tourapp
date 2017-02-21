const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe('Agent request', () => {

  let agent1, company1, company2, agent1Token

  const agent1Props = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const company1Props = {
    email: 'company1@test.com',
    password: '1234'
  }


  const company2Props = {
    email: 'company2@test.com',
    password: '1234'
  }

  const agent1SigninProps = Object.assign({}, agent1Props, { role: 'agent' })
  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {
    agent1 = new Agent(agent1Props)
    company1 = new Company(company1Props)
    company2 = new Company(company2Props)

    Promise.all([
        agent1.save(),
        company1.save(),
        company2.save()
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
      .end((err, res) => {
        if (err) return done(err)

        Agent.findById(agent1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .delete('/agents/cancel-request')
          .send({ _id: company1._id })
          .set('authorization', agent1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Agent.findById(agent1._id),
                Company.findById(company1._id)
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
        request(app)
          .post('/companies/request')
          .send({ _id: agent1._id })
          .set('authorization', company1Token)
          .end((err, res) => {
            if (err) return done(err)

            request(app)
              .delete('/agents/reject-request')
              .send({ _id: company1._id })
              .set('authorization', agent1Token)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err)

                Promise.all([
                    Agent.findById(agent1._id),
                    Company.findById(company1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        Company.findById(company1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/agents/request')
          .send({ _id: company1._id })
          .set('authorization', agent1Token)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Agent.findById(agent1._id),
                Company.findById(company1._id)
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
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/agents/request')
          .send({ _id: company2._id })
          .set('authorization', agent1Token)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            Promise.all([
                Agent.findById(agent1._id),
                Company.findById(company1._id),
                Company.findById(company2._id)
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
      .end((err, res) => {
        if (err) return done(err)

        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)

            const company1Token = res.body.token

            request(app)
              .post('/companies/accept')
              .send({ _id: agent1._id })
              .set('authorization', company1Token)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err)

                request(app)
                  .post('/agents/request')
                  .send({ _id: company1._id })
                  .set('authorization', agent1Token)
                  .expect(422)
                  .end((err, res) => {
                    if (err) return done(err)

                    done()
                  })
              })
          })
      })
  })
})
