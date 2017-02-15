const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')

describe('company authentication', () => {

  describe('signup', () => {

    it('create a new company', done => {
      Company.count().then(count => {
        request(app)
          .post('/companies/signup')
          .send({
            email: 'company1@test.com',
            password: '1234'
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err)

            Company.count().then(newCount => {
              expect(count + 1).to.equal(newCount)
              done()
            })
          })
      })
    })

    it('can not be use a duplicate email', done => {
      const companyProps = {
        email: 'company1@test.com',
        password: '1234'
      }
      const company = new Company(companyProps)

      company.save().then(() => {
        request(app)
          .post('/companies/signup')
          .send(companyProps)
          .expect(422)
          .end((err, res) => {
            if (err) return done(err)

            expect(res.body.error).to.equal('Email is in use')
            done()
          })
      })
    })
  })
})
