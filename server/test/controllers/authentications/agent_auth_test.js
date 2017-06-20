import dirtyChai from 'dirty-chai'
import chai from 'chai'
import mongoose from 'mongoose'
import { comparePassword } from '../../../src/helpers/authentication'
import * as h from '../../helpers'

chai.use(dirtyChai)

const expect = chai.expect
const Agent = mongoose.model('Agent')

describe('agent authentication', () => {
  const agentProps = {
    email: 'agent1@test.com',
    password: '1234'
  }

  const agentSigninProps = { ...agentProps, role: 'agent' }

  describe('signup', () => {
    it('create a new agent', async () => {
      const count = await Agent.count()
      await h.agentSignUp(agentProps).expect(201)
      const newCount = await Agent.count()
      expect(count + 1).to.equal(newCount)
    })

    it('must provide email and password', async () => {
      const agentWithoutEmail = {
        email: undefined,
        password: '1234'
      }
      const agentWithoutPassword = {
        email: 'agent1@test.com',
        password: undefined
      }
      const res = await h.agentSignUp(agentWithoutEmail).expect(422)
      expect(res.body.error).to.equal('Must provide email and password')
      const res1 = await h.agentSignUp(agentWithoutPassword).expect(422)
      expect(res1.body.error).to.equal('Must provide email and password')
    })

    it('can not be use a duplicate email', async () => {
      const agent = new Agent(agentProps)
      await agent.save()
      const res = await h.agentSignUp(agentProps).expect(422)
      expect(res.body.error).to.equal('Email is in use')
    })

    it('password must be hash', async () => {
      await h.agentSignUp(agentProps).expect(201)
      const agent = await Agent.findOne({ email: agentProps.email })
      expect(agent.password).to.not.equal(agentProps.password)
    })

    it('return token in body', async () => {
      const res = await h.agentSignUp(agentProps).expect(201)
      expect(res.body.token).to.be.exist()
    })
  })

  describe('signin', () => {
    let testAgent

    beforeEach(async () => {
      await h.agentSignUp(agentProps)
      const agent = await Agent.findOne({ email: agentProps.email })
      testAgent = agent
    })

    it('comparePassword must be valid', async () => {
      const isMatch = await comparePassword(
        agentProps.password,
        testAgent.password
      )
      expect(isMatch).to.equal(true)
    })

    it('comparePassword must be invalid', async () => {
      const isMatch = await comparePassword('4321', testAgent.password)
      expect(isMatch).to.equal(false)
    })

    it('return token in body', async () => {
      const res = await h.agentSignIn(agentSigninProps).expect(200)
      expect(res.body.token).to.be.exist()
    })

    it('return status 401 when dont send role', async () => {
      await h.agentSignIn(agentProps).expect(401)
    })
  })

  describe('auth with jwt', () => {
    it('signup token can get secret route', async () => {
      const res = await h.agentSignUp(agentProps)
      const token = res.body.token
      await h.agentGetProfile(token).expect(200)
    })

    it('signin token can get secret route', async () => {
      await h.agentSignUp(agentProps)
      const res = await h.agentSignIn(agentSigninProps)
      const token = res.body.token
      await h.agentGetProfile(token).expect(200)
    })

    it('fake token can not get secret route', async () => {
      const token = 'fake token'
      await h.agentGetProfile(token).expect(401)
    })

    it('company token can not get secret route', async () => {
      const companyProps = {
        email: 'company1@test.com',
        password: '1234'
      }
      const res = await h.companySignUp(companyProps).expect(201)
      const companyToken = res.body.token
      await h.agentGetProfile(companyToken).expect(401)
    })
  })
})
