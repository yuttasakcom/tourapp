const sinon = require('sinon')
const Agent = require('../../../../src/classes/Agent')
const repo = require('../../../../src/repositories')

describe('Agent.rejectRequest', () => {
  let agentRejectRequestStub
  let agent
  const companyId = 'companyId'

  beforeEach(() => {
    agent = new Agent('agentId')
    agentRejectRequestStub = sinon
      .stub(repo, 'agentRejectRequest')
      .resolves(true)
  })

  it('agentRejectRequest must be called once', async () => {
    await agent.rejectRequest(companyId)
    sinon.assert.calledOnce(agentRejectRequestStub)
  })

  it('agentRejectRequest must be called with agentId and companyId', async () => {
    await agent.rejectRequest(companyId)
    sinon.assert.calledWith(agentRejectRequestStub, 'agentId', 'companyId')
  })

  afterEach(() => {
    agentRejectRequestStub.restore()
  })
})
