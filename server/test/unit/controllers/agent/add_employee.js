const sinon = require('sinon')
const { expect } = require('chai')

const addEmployee = require('../../../../src/controllers/agent/addEmployee')
const auth = require('../../../../src/helpers/authentication')
const repo = require('../../../../src/repositories')

describe('add_employee controller', () => {
  const req = {
    user: { _id: 'agentId' },
    params: { id: 'companyId' },
    body: { email: '', password: '' }
  }
  const res = {
    status: () => ({
      send: () => ''
    })
  }
  let resStub
  let hashPasswordStub
  let checkEmployeeEmailExistStub
  let agentAddEmployeeStub

  beforeEach(() => {
    req.body.email = 'test@test.com'
    req.body.password = '1234'
    resStub = sinon.spy(res, 'status')
    hashPasswordStub = sinon
      .stub(auth, 'hashPassword')
      .resolves('hashed password')

    checkEmployeeEmailExistStub = sinon
      .stub(auth, 'checkEmployeeEmailExist')
      .resolves(false)

    agentAddEmployeeStub = sinon.stub(repo, 'agentAddEmployee')
  })

  it('email empty must be error 422 to middleware', async () => {
    req.body.email = ''
    await addEmployee(req, res, err => {
      expect(err.message).to.equal('Must provide email and password')
      expect(err.status).to.equal(422)
    })
  })

  it('employee email exist must be error 422 to middleware', async () => {
    checkEmployeeEmailExistStub.resolves(true)
    await addEmployee(req, res, err => {
      expect(err.message).to.equal('Email is in use')
      expect(err.status).to.equal(422)
    })
  })

  it('hashPassword must be called once', async () => {
    await addEmployee(req, res)
    sinon.assert.calledOnce(hashPasswordStub)
  })

  it('hashPassword must be called with 1234', async () => {
    await addEmployee(req, res)
    sinon.assert.calledWith(hashPasswordStub, '1234')
  })

  it('agentAddEmployee must be called once', async () => {
    await addEmployee(req, res)
    sinon.assert.calledOnce(agentAddEmployeeStub)
  })

  it('agentAddEmployee must be called with agentId and hashed password employeeProps', async () => {
    await addEmployee(req, res)
    sinon.assert.calledWith(agentAddEmployeeStub, 'agentId', {
      email: 'test@test.com',
      password: 'hashed password'
    })
  })

  it('add employee completed must be return status 201', async () => {
    await addEmployee(req, res)
    sinon.assert.calledWith(resStub, 201)
  })

  afterEach(() => {
    resStub.restore()
    hashPasswordStub.restore()
    checkEmployeeEmailExistStub.restore()
    agentAddEmployeeStub.restore()
  })
})
