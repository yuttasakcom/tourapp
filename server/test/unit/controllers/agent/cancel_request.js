const sinon = require('sinon')
const cancelRequest = require('../../../../src/controllers/agent/cancelRequest')
const repo = require('../../../../src/repositories')

describe('agent cancel request controller', () => {
  const req = { user: { _id: 'agentId' }, params: { id: 'companyId' } }
  const res = { send: () => '' }
  let resSendStub
  let agentCancelRequestStub

  beforeEach(() => {
    resSendStub = sinon.spy(res, 'send')
    agentCancelRequestStub = sinon
      .stub(repo, 'agentCancelRequest')
      .resolves(true)
  })

  it('agentRejectRequest must be called once', async () => {
    await cancelRequest(req, res)
    sinon.assert.calledOnce(agentCancelRequestStub)
  })

  it('agentRejectRequest must be called with agentId and companyId', async () => {
    await cancelRequest(req, res)
    sinon.assert.calledWith(agentCancelRequestStub, 'agentId', 'companyId')
  })

  it('cancel request complete must be send message', async () => {
    await cancelRequest(req, res)
    sinon.assert.calledWith(resSendStub, {
      message: 'Cancel request completed'
    })
  })

  afterEach(() => {
    resSendStub.restore()
    agentCancelRequestStub.restore()
  })
})
