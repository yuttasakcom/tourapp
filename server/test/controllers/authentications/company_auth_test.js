import request from 'supertest'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import mongoose from 'mongoose'
import app from '../../../src/app'
import { comparePassword } from '../../../src/helpers/authentication'

chai.use(dirtyChai)

const Company = mongoose.model('Company')
const expect = chai.expect

describe('company authentication', () => {
  const companyProps = {
    email: 'company1@test.com',
    password: '1234',
  }

  const companySigninProps = {...companyProps, role: 'company' }

  describe('signup', () => {
    it('create a new company', done => {
      Company.count().then(count => {
        request(app)
          .post('/companies/signup')
          .send(companyProps)
          .expect(201)
          .end(err => {
            if (err) return done(err)

            return Company
              .count().then(newCount => {
                expect(count + 1).to.equal(newCount)
                done()
              })
          })
      })
    })

    it('must provide email and password', done => {
      const companyWithoutEmail = {
        email: undefined,
        password: '1234',
      }
      const companyWithoutPassword = {
        email: 'company1@test.com',
        password: undefined,
      }
      request(app)
        .post('/companies/signup')
        .send(companyWithoutEmail)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.error).to.equal('Must provide email and password')
          return request(app)
            .post('/companies/signup')
            .send(companyWithoutPassword)
            .expect(422)
            .end((resErr, res1) => {
              if (resErr) return done(resErr)

              expect(res1.body.error).to.equal('Must provide email and password')
              return done()
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
            return done()
          })
      })
    })

    it('password must be hash', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .expect(201)
        .end(err => {
          if (err) return done(err)

          return Company
            .findOne({ email: companyProps.email })
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

          expect(res.body.token).to.be.exist()
          return done()
        })
    })
  })

  describe('signin', () => {
    let testCompany

    beforeEach(done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end(err => {
          if (err) return done(err)

          return Company
            .findOne({ email: companyProps.email })
            .then(company => {
              testCompany = company
              done()
            })
        })
    })

    it('comparePassword must be valid', done => {
      comparePassword(companyProps.password, testCompany.password)
        .then(isMatch => {
          expect(isMatch).to.equal(true)
          done()
        })
        .catch(done)
    })

    it('comparePassword must be invalid', done => {
      comparePassword('4321', testCompany.password)
        .then(isMatch => {
          expect(isMatch).to.equal(false)
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

          expect(res.body.token).to.be.exist()
          return done()
        })
    })

    it('return status 401 when dont send role', done => {
      request(app)
        .post('/companies/signin')
        .send(companyProps)
        .expect(401, done)
    })
  })

  describe('auth with jwt', () => {
    it('signup token can get secret route', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end((err, res) => {
          if (err) return done(err)

          const token = res.body.token
          return request(app)
            .get('/companies/profile')
            .set('authorization', token)
            .expect(200, done)
        })
    })

    it('signin token can get secret route', done => {
      request(app)
        .post('/companies/signup')
        .send(companyProps)
        .end(err => {
          if (err) return done(err)

          return request(app)
            .post('/companies/signin')
            .send(companySigninProps)
            .end((err1, res) => {
              if (err1) return done(err1)

              const token = res.body.token
              return request(app)
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
        password: '1234',
      }

      request(app)
        .post('/agents/signup')
        .send(agentProps)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          const agentToken = res.body.token
          return request(app)
            .get('/companies/profile')
            .set('authorization', agentToken)
            .expect(401, done)
        })
    })
  })
})
