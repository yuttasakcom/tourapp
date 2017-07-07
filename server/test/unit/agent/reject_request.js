const sinon = require('sinon')
const rejectRequest = require('../../../src/controllers/agent/rejectRequest')
const repo = require('../../../src/repositories')

describe('agent reject request', () => {
  const req = { user: { _id: 'agentId' }, params: { id: 'companyId' } }
  const res = { send: () => '' }
  let agentRejectRequest

  before(() => {
    agentRejectRequest = sinon.stub(repo, 'agentRejectRequest').resolves(true)
  })

  it('agentRejectRequest must be called once', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledOnce(agentRejectRequest)
  })

  it('agentRejectRequest must be called with agentId and companyId', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledWith(agentRejectRequest, 'agentId', 'companyId')
  })

  it('res.send must be called with Reject request completed message', async () => {
    const send = sinon.spy(res, 'send')
    await rejectRequest(req, res)
    sinon.assert.calledWith(send, { message: 'Reject request completed' })
  })
})
