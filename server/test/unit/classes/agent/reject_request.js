const sinon = require('sinon')
const Agent = require('../../../../src/classes/Agent')
const repo = require('../../../../src/repositories')

describe('Agent.rejectRequest', () => {
  let agentRejectRequest
  let agent
  const companyId = 'companyId'

  before(() => {
    agent = new Agent('agentId')
    agentRejectRequest = sinon.stub(repo, 'agentRejectRequest').resolves(true)
  })

  it('agentRejectRequest must be called once', async () => {
    await agent.rejectRequest(companyId)
    sinon.assert.calledOnce(agentRejectRequest)
  })

  it('agentRejectRequest must be called with agentId and companyId', async () => {
    await agent.rejectRequest(companyId)
    sinon.assert.calledWith(agentRejectRequest, 'agentId', 'companyId')
  })
})
