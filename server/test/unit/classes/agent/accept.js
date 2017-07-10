const sinon = require('sinon')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Agent = require('../../../../src/classes/Agent')
const repo = require('../../../../src/repositories')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Agent.accept', () => {
  let agent
  const companyId = 'companyId'
  let agentCheckRequestExistStub
  let agentAcceptStub

  beforeEach(() => {
    agent = new Agent('agentId')
    agentCheckRequestExistStub = sinon
      .stub(repo, 'agentCheckRequestExist')
      .resolves(true)
    agentAcceptStub = sinon.stub(repo, 'agentAccept').resolves(true)
  })

  it('init object must be set to _id', async () => {
    expect(agent._id).to.equal('agentId')
  })

  it('agentCheckRequestExist must be called once', async () => {
    await agent.accept(companyId)
    sinon.assert.calledOnce(agentCheckRequestExistStub)
  })

  it('agentAccept must be called once if request exist', async () => {
    await agent.accept(companyId)
    sinon.assert.calledOnce(agentAcceptStub)
  })

  it('must throw error if agentCheckRequestExist return false', async () => {
    agentCheckRequestExistStub.resolves(false)
    return expect(agent.accept(companyId)).to.be.rejectedWith(
      'Request not found'
    )
  })

  it('agentAccept must be not call if request not exist', async () => {
    agentCheckRequestExistStub.resolves(false)
    try {
      await agent.accept(companyId)
    } catch (e) {
      expect(agentAcceptStub.callCount).to.equal(0)
    }
  })

  afterEach(() => {
    agentCheckRequestExistStub.restore()
    agentAcceptStub.restore()
  })
})
