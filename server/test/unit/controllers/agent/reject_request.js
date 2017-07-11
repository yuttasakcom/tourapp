const sinon = require('sinon')
const rejectRequest = require('../../../../src/controllers/agent/rejectRequest')
const repo = require('../../../../src/repositories')

describe('agent reject request controller', () => {
  const req = { user: { _id: 'agentId' }, params: { id: 'companyId' } }
  const res = { send: () => '' }
  let agentRejectRequestStub

  beforeEach(() => {
    agentRejectRequestStub = sinon
      .stub(repo, 'agentRejectRequest')
      .resolves(true)
  })

  it('agentRejectRequest must be called once', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledOnce(agentRejectRequestStub)
  })

  it('agentRejectRequest must be called with agentId and companyId', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledWith(agentRejectRequestStub, 'agentId', 'companyId')
  })

  afterEach(() => {
    agentRejectRequestStub.restore()
  })
})
