const sinon = require('sinon')
const { expect } = require('chai')
const addBooking = require('../../../../src/controllers/agent_employee/addBooking')
const repo = require('../../../../src/repositories')

describe('agentEmployee addBooking controller', () => {
  const req = {
    user: { _id: 'agentEmployeeId', agentId: 'agentId' },
    body: { company: 'companyId' }
  }
  const res = { send: () => '' }
  let resSendStub
  let agentCheckMemberExistStub
  let agentAddBookingStub

  beforeEach(() => {
    resSendStub = sinon.spy(res, 'send')
    agentCheckMemberExistStub = sinon
      .stub(repo, 'agentCheckMemberExist')
      .resolves(true)
    agentAddBookingStub = sinon.stub(repo, 'agentAddBooking').resolves(true)
  })

  it('agentCheckMemberExist must be called once', async () => {
    await addBooking(req, res)
    sinon.assert.calledOnce(agentCheckMemberExistStub)
  })

  it('agentCheckMemberExist must be called with agentId and companyId', async () => {
    await addBooking(req, res)
    sinon.assert.calledWith(agentCheckMemberExistStub, 'agentId', 'companyId')
  })

  it('agentBook must be called once if request exist', async () => {
    await addBooking(req, res)
    sinon.assert.calledOnce(agentAddBookingStub)
  })

  it('agentBook must be not call if member not exist', async () => {
    agentCheckMemberExistStub.resolves(false)
    await addBooking(req, res, () => '')
    expect(agentAddBookingStub.callCount).to.equal(0)
  })

  it('if member not exist must be send error to middleware', async () => {
    agentCheckMemberExistStub.resolves(false)
    await addBooking(req, res, err => {
      expect(err.message).to.equal('This company is not member')
      expect(err.status).to.equal(401)
    })
  })

  it('bookingProps.agent and employee must be set', async () => {
    await addBooking(req, res)
    expect(req.body.agent).to.equal('agentId')
    expect(req.body.employee).to.equal('agentEmployeeId')
  })

  it('book complete must be send message', async () => {
    await addBooking(req, res)
    sinon.assert.calledWith(resSendStub, true)
  })

  afterEach(() => {
    resSendStub.restore()
    agentCheckMemberExistStub.restore()
    agentAddBookingStub.restore()
  })
})
