const sinon = require('sinon')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Agent = require('../../../../src/classes/Agent')
const repo = require('../../../../src/repositories')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Agent.book', () => {
  let agent
  const bookingProps = { company: 'companyId' }
  let agentCheckMemberExistStub
  let agentAddBookingStub

  beforeEach(() => {
    agent = new Agent('agentId')
    agentCheckMemberExistStub = sinon
      .stub(repo, 'agentCheckMemberExist')
      .resolves(true)
    agentAddBookingStub = sinon.stub(repo, 'agentAddBooking').resolves(true)
  })

  it('init object must be set to _id', async () => {
    expect(agent._id).to.equal('agentId')
  })

  it('agentCheckMemberExist must be called once', async () => {
    await agent.book(bookingProps)
    sinon.assert.calledOnce(agentCheckMemberExistStub)
  })

  it('agentCheckMemberExist must be called with agentId and companyId', async () => {
    await agent.book(bookingProps)
    sinon.assert.calledWith(agentCheckMemberExistStub, 'agentId', 'companyId')
  })

  it('agentBook must be called once if request exist', async () => {
    await agent.book(bookingProps)
    sinon.assert.calledOnce(agentAddBookingStub)
  })

  it('must throw error if agentCheckMemberExist return false', async () => {
    agentCheckMemberExistStub.resolves(false)
    return expect(agent.book(bookingProps)).to.be.rejectedWith(
      'This company is not member'
    )
  })

  it('agentBook must be not call if member not exist', async () => {
    agentCheckMemberExistStub.resolves(false)
    try {
      await agent.book(bookingProps)
    } catch (e) {
      expect(agentAddBookingStub.callCount).to.equal(0)
    }
  })

  it('bookingProps.agent must be set', async () => {
    await agent.book(bookingProps)
    expect(bookingProps.agent).to.equal('agentId')
  })

  afterEach(() => {
    agentCheckMemberExistStub.restore()
    agentAddBookingStub.restore()
  })
})
