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
  let agentCheckRequestExist
  let agentAccept

  beforeEach(() => {
    agent = new Agent('agentId')
    agentCheckRequestExist = sinon
      .stub(repo, 'agentCheckRequestExist')
      .resolves(true)
    agentAccept = sinon.stub(repo, 'agentAccept').resolves(true)
  })

  it('init object must be set to _id', async () => {
    expect(agent._id).to.equal('agentId')
  })

  it('agentCheckRequestExist must be called once', async () => {
    await agent.accept(companyId)
    sinon.assert.calledOnce(agentCheckRequestExist)
  })

  it('agentAccept must be called once if request exist', async () => {
    await agent.accept(companyId)
    sinon.assert.calledOnce(agentAccept)
  })

  it('must throw error if agentCheckRequestExist return false', async () => {
    agentCheckRequestExist.resolves(false)
    return expect(agent.accept(companyId)).to.be.rejectedWith(
      'Request not found'
    )
  })

  it('agentAccept must be not call if request not exist', async () => {
    agentCheckRequestExist.resolves(false)
    try {
      await agent.accept(companyId)
    } catch (e) {
      expect(agentAccept.callCount).to.equal(0)
    }
  })

  afterEach(() => {
    agentCheckRequestExist.restore()
    agentAccept.restore()
  })
})
