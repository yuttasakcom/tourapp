const app = require('../../../app')
const request = require('supertest')
const expect = require('chai').expect
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const { comparePassword } = require('../../../helpers/authentication')

describe('company authentication', () => {

  const companyProps = {
    email: 'company1@test.com',
    password: '1234'
  }

  const companySigninProps = Object.assign({}, companyProps, { role: 'company' })

  describe('signup', () => {

    it('create a new company', done => {
      Company.count().then(count => {
        request(app)
          .post('/companies/signup')
          .send(companyProps)
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

    it('must provide email and password', done => {
      const companyWithoutEmail = {
        email: undefined,
        password: '1234'
      }
      const companyWithoutPassword = {
        email: 'company1@test.com',
        password: undefined
      }
      request(app)
        .post('/companies/signup')
        .send(companyWithoutEmail)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.error).to.equal('Must provide email and password')
          request(app)
            .post('/companies/signup')
            .send(companyWithoutPassword)
            .expect(422)
            .end((err, res) => {
              if (err) return done(err)

              expect(res.body.error).to.equal('Must provide email and password')
              done()
            })
        })
    })

    it('can not be use a duplicate email', done => {
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

    it('password must be hash', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          Company.findOne({ email: companyProps.email })
            .then(company => {
              expect(company.password).to.not.equal(companyProps.password)
              done()
            })
            .catch(done)
        })
    })

    it('return token in body', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.token).to.be.exist
          done()
        })
    })
  })

  describe('signin', () => {

    let testCompany

    beforeEach(done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end((err, res) => {
          if (err) return done(err)

          Company.findOne({ email: companyProps.email })
            .then(company => {
              testCompany = company
              done()
            })
        })
    })

    it('comparePassword must be valid', done => {
      comparePassword(companyProps.password, testCompany.password)
        .then(isMatch => {
          expect(isMatch).to.be.true
          done()
        })
        .catch(done)
    })

    it('comparePassword must be invalid', done => {
      comparePassword('4321', testCompany.password)
        .then(isMatch => {
          expect(isMatch).to.be.false
          done()
        })
        .catch(done)
    })

    it('return token in body', done => {
      request(app)
        .post('/companies/signin')
        .send(companySigninProps)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.token).to.be.exist
          done()
        })
    })
  })

  describe('auth with jwt', done => {

    it('signup token can get secret route', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end((err, res) => {
          if (err) return done(err)

          const token = res.body.token
          request(app)
            .get('/companies/profile')
            .set('authorization', token)
            .expect(200, done)
        })
    })

    it('signin token can get secret route', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end((err, res) => {
          if (err) return done(err)

          request(app)
            .post('/companies/signin')
            .send(companySigninProps)
            .end((err, res) => {
              if (err) return done(err)

              const token = res.body.token
              request(app)
                .get('/companies/profile')
                .set('authorization', token)
                .expect(200, done)
            })
        })
    })

    it('fake token can not get secret route', done => {
      const token = 'fake token'
      request(app)
        .get('/companies/profile')
        .set('authorization', token)
        .expect(401, done)
    })

    it('agent token can not get secret route', done => {
      const agentProps = {
        email: 'agent1@test.com',
        password: '1234'
      }

      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          const agentToken = res.body.token
          request(app)
            .get('/companies/profile')
            .set('authorization', agentToken)
            .expect(401, done)
        })
    })

  })
})
