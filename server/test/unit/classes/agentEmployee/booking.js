const sinon = require('sinon')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const AgentEmployee = require('../../../../src/classes/AgentEmployee')
const repo = require('../../../../src/repositories')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('AgentEmployee.book', () => {
  let agentEmployee
  const bookingProps = { company: 'companyId' }
  let agentCheckMemberExistStub
  let agentAddBookingStub

  beforeEach(() => {
    agentEmployee = new AgentEmployee('agentEmployeeId', 'agentId')
    agentCheckMemberExistStub = sinon
      .stub(repo, 'agentCheckMemberExist')
      .resolves(true)
    agentAddBookingStub = sinon.stub(repo, 'agentAddBooking').resolves(true)
  })

  it('init object must be set to _id and agentId', async () => {
    expect(agentEmployee._id).to.equal('agentEmployeeId')
    expect(agentEmployee.agentId).to.equal('agentId')
  })

  it('agentCheckMemberExist must be called once', async () => {
    await agentEmployee.book(bookingProps)
    sinon.assert.calledOnce(agentCheckMemberExistStub)
  })

  it('agentCheckMemberExist must be called with agentId and companyId', async () => {
    await agentEmployee.book(bookingProps)
    sinon.assert.calledWith(agentCheckMemberExistStub, 'agentId', 'companyId')
  })

  it('agentBook must be called once if request exist', async () => {
    await agentEmployee.book(bookingProps)
    sinon.assert.calledOnce(agentAddBookingStub)
  })

  it('must throw error if agentCheckMemberExist return false', async () => {
    agentCheckMemberExistStub.resolves(false)
    return expect(agentEmployee.book(bookingProps)).to.be.rejectedWith(
      'This company is not member'
    )
  })

  it('agentBook must be not call if member not exist', async () => {
    agentCheckMemberExistStub.resolves(false)
    try {
      await agentEmployee.book(bookingProps)
    } catch (e) {
      expect(agentAddBookingStub.callCount).to.equal(0)
    }
  })

  it('bookingProps.agent and employee must be set', async () => {
    await agentEmployee.book(bookingProps)
    expect(bookingProps.agent).to.equal('agentId')
    expect(bookingProps.employee).to.equal('agentEmployeeId')
  })

  afterEach(() => {
    agentCheckMemberExistStub.restore()
    agentAddBookingStub.restore()
  })
})
