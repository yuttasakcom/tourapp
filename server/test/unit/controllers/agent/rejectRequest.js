const sinon = require('sinon')
const rejectRequest = require('../../../../src/controllers/agent/rejectRequest')
const repo = require('../../../../src/repositories')

describe('agent rejectRequest controller', () => {
  const req = { user: { _id: 'agentId' }, params: { id: 'companyId' } }
  const res = { send: () => '' }
  let resSendStub
  let agentRejectRequestStub

  beforeEach(() => {
    resSendStub = sinon.spy(res, 'send')
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

  it('request completed must be send message', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledWith(resSendStub, {
      message: 'Reject request completed'
    })
  })

  afterEach(() => {
    resSendStub.restore()
    agentRejectRequestStub.restore()
  })
})
