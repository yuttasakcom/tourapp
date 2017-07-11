const sinon = require('sinon')
const rejectRequest = require('../../../../src/controllers/agent/rejectRequest')
const Agent = require('../../../../src/classes/Agent')

describe('agent reject request controller', () => {
  const req = { user: { _id: 'agentId' }, params: { id: 'companyId' } }
  const res = { send: () => '' }
  let rejectRequestStub

  beforeEach(() => {
    rejectRequestStub = sinon
      .stub(Agent.prototype, 'rejectRequest')
      .resolves(true)
  })

  it('agent.rejectRequest must be called once', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledOnce(rejectRequestStub)
  })

  it('agent.rejectRequest must be called with companyId', async () => {
    await rejectRequest(req, res)
    sinon.assert.calledWith(rejectRequestStub, 'companyId')
  })

  it('res.send must be called with Reject request completed message', async () => {
    const sendStub = sinon.spy(res, 'send')
    await rejectRequest(req, res)
    sendStub.restore()
    sinon.assert.calledWith(sendStub, { message: 'Reject request completed' })
  })

  afterEach(() => {
    rejectRequestStub.restore()
  })
})
