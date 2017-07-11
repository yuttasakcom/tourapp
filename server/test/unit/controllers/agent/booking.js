const sinon = require('sinon')
const { expect } = require('chai')
const addBooking = require('../../../../src/controllers/agent/addBooking')
const repo = require('../../../../src/repositories')

describe('agent addBooking controller', () => {
  const req = { user: { _id: 'agentId' }, body: { company: 'companyId' } }
  const res = { send: () => '' }
  let agentCheckMemberExistStub
  let agentAddBookingStub

  beforeEach(() => {
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
    try {
      await addBooking(req, res)
    } catch (e) {
      expect(agentAddBookingStub.callCount).to.equal(0)
    }
  })

  it('bookingProps.agent must be set', async () => {
    await addBooking(req, res)
    expect(req.body.agent).to.equal('agentId')
  })

  afterEach(() => {
    agentCheckMemberExistStub.restore()
    agentAddBookingStub.restore()
  })
})
