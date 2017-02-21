const app = require('../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

describe.only('Company pendings list', () => {

  let company1, company1Token

  const company1Props = {
    email: 'company1@test.com',
    password: '1234',
  }

  const agent1Stub = new Agent({
    email: 'agent1stub@test.com',
    password: '1234'
  })

  const agent2Stub = new Agent({
    email: 'agent2stub@test.com',
    password: '1234'
  })

  const company1SigninProps = Object.assign({}, company1Props, { role: 'company' })

  beforeEach(done => {
    company1 = new Company(company1Props)
    company1.requestPendings.push(agent1Stub)
    company1.requestPendings.push(agent2Stub)
    company1.save()
      .then(() => {
        request(app)
          .post('/companies/signin')
          .send(company1SigninProps)
          .end((err, res) => {
            if (err) return done(err)

            company1Token = res.body.token
          	done()
          })
      })
  })

  it('two agent must appear on GET /companies/request-pendings', done => {
    request(app)
      .get('/companies/request-pendings')
      .set('authorization', company1Token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.requestPendings.length).to.equal(2)
        done()
      })
  })
})
