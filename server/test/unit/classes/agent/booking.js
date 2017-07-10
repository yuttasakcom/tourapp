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
  let bookStub

  beforeEach(() => {
    agent = new Agent('agentId')
    agentCheckMemberExistStub = sinon
      .stub(repo, 'agentCheckMemberExist')
      .resolves(true)
    bookStub = sinon.stub(repo, 'book').resolves(true)
  })

  it('init object must be set to _id', async () => {
    expect(agent._id).to.equal('agentId')
  })

  it('agentCheckMemberExist must be called once', async () => {
    await agent.book(bookingProps)
    sinon.assert.calledOnce(agentCheckMemberExistStub)
  })

  it('agentBook must be called once if request exist', async () => {
    await agent.book(bookingProps)
    sinon.assert.calledOnce(bookStub)
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
      expect(bookStub.callCount).to.equal(0)
    }
  })

  afterEach(() => {
    agentCheckMemberExistStub.restore()
    bookStub.restore()
  })
})
