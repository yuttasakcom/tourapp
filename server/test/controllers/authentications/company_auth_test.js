import chai from 'chai'
import dirtyChai from 'dirty-chai'
import mongoose from 'mongoose'
import { comparePassword } from '../../../src/helpers/authentication'
import * as h from '../../helpers'

chai.use(dirtyChai)

const Company = mongoose.model('Company')
const expect = chai.expect

describe('company authentication', () => {
  const companyProps = {
    email: 'company1@test.com',
    password: '1234'
  }

  const companySigninProps = { ...companyProps, role: 'company' }

  describe('signup', () => {
    it('create a new company', async () => {
      const count = await Company.count()
      await h.companySignUp(companyProps)
      const newCount = await Company.count()
      expect(count + 1).to.equal(newCount)
    })

    it.only('signup must return company id', async () => {
      const res = await h.companySignUp(companyProps)
      const company = await Company.findOne({ email: companyProps.email })
      expect(res.body._id).to.equal(company._id.toString())
    })

    it('must provide email and password', async () => {
      const companyWithoutEmail = {
        email: undefined,
        password: '1234'
      }
      const companyWithoutPassword = {
        email: 'company1@test.com',
        password: undefined
      }
      const res = await h.companySignUp(companyWithoutEmail).expect(422)
      expect(res.body.error).to.equal('Must provide email and password')
      const res1 = await h.companySignUp(companyWithoutPassword).expect(422)
      expect(res1.body.error).to.equal('Must provide email and password')
    })

    it('can not be use a duplicate email', async () => {
      const company = new Company(companyProps)
      await company.save()
      const res = await h.companySignUp(companyProps).expect(422)
      expect(res.body.error).to.equal('Email is in use')
    })

    it('password must be hash', async () => {
      await h.companySignUp(companyProps).expect(201)
      const company = await Company.findOne({ email: companyProps.email })
      expect(company.password).to.not.equal(companyProps.password)
    })

    it('return token in body', async () => {
      const res = await h.companySignUp(companyProps).expect(201)
      expect(res.body.token).to.be.exist()
    })
  })

  describe('signin', () => {
    let testCompany

    beforeEach(async () => {
      await h.companySignUp(companyProps)
      const company = await Company.findOne({ email: companyProps.email })
      testCompany = company
    })

    it('comparePassword must be valid', async () => {
      const isMatch = await comparePassword(
        companyProps.password,
        testCompany.password
      )
      expect(isMatch).to.equal(true)
    })

    it('comparePassword must be invalid', async () => {
      const isMatch = await comparePassword('4321', testCompany.password)
      expect(isMatch).to.equal(false)
    })

    it('return token in body', async () => {
      const res = await h.companySignIn(companySigninProps).expect(200)
      expect(res.body.token).to.be.exist()
    })

    it('return status 401 when dont send role', async () => {
      await h.companySignIn(companyProps).expect(401)
    })
  })

  describe('auth with jwt', () => {
    it('signup token can get secret route', async () => {
      const res = await h.companySignUp(companyProps)
      const token = res.body.token
      await h.companyGetProfile(token).expect(200)
    })

    it('signin token can get secret route', async () => {
      await h.companySignUp(companyProps)
      const res = await h.companySignIn(companySigninProps)
      const token = res.body.token
      await h.companyGetProfile(token).expect(200)
    })

    it('fake token can not get secret route', async () => {
      const token = 'fake token'
      await h.companyGetProfile(token).expect(401)
    })

    it('agent token can not get secret route', async () => {
      const agentProps = {
        email: 'agent1@test.com',
        password: '1234'
      }

      const res = await h.agentSignUp(agentProps).expect(201)
      const agentToken = res.body.token
      await h.companyGetProfile(agentToken).expect(401)
    })
  })
})
