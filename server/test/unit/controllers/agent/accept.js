const sinon = require('sinon')
const accept = require('../../../../src/controllers/agent/accept')
const Agent = require('../../../../src/classes/Agent')

describe('agent accept controller', () => {
  const req = { user: { _id: 'agentId' }, body: { _id: 'companyId' } }
  const res = { send: () => '' }
  let acceptStub

  beforeEach(() => {
    acceptStub = sinon.stub(Agent.prototype, 'accept').resolves(true)
  })

  it('agent.accept must be called once', async () => {
    await accept(req, res)
    sinon.assert.calledOnce(acceptStub)
  })

  it('agent.accept must be called with companyId', async () => {
    await accept(req, res)
    sinon.assert.calledWith(acceptStub, 'companyId')
  })

  it('res.send must be called with Accept request completed message', async () => {
    const send = sinon.spy(res, 'send')
    await accept(req, res)
    send.restore()
    sinon.assert.calledWith(send, { message: 'Accept request completed' })
  })

  afterEach(() => {
    acceptStub.restore()
  })
})
