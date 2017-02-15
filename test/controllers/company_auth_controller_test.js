const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')

describe('company authentication', () => {

  it('POST /companies/signup create a new company', done => {
    Company.count().then(count => {
      request(app)
        .post('/companies/signup')
        .send({ email: 'company1@test.com' })
        .end((err, res) => {
          if (err) return done(err)

          Company.count().then(newCount => {
            expect(count + 1).to.equal(newCount)
            done()
          })
        })
    })
  })
})
