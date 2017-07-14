const sinon = require('sinon')
const { expect } = require('chai')
const accept = require('../../../../src/controllers/agent/accept')
const repo = require('../../../../src/repositories')

describe('agent accept controller', () => {
  const req = { user: { _id: 'agentId' }, body: { _id: 'companyId' } }
  const res = { send: () => '' }
  let resSendStub
  let agentCheckRequestExistStub
  let agentAcceptStub

  beforeEach(() => {
    resSendStub = sinon.spy(res, 'send')
    agentCheckRequestExistStub = sinon
      .stub(repo, 'agentCheckRequestExist')
      .resolves(true)
    agentAcceptStub = sinon.stub(repo, 'agentAccept').resolves(true)
  })

  it('agentCheckRequestExist must be called once', async () => {
    await accept(req, res)
    sinon.assert.calledOnce(agentCheckRequestExistStub)
  })

  it('agentAccept must be called once if request exist', async () => {
    await accept(req, res)
    sinon.assert.calledOnce(agentAcceptStub)
  })

  it('agentAccept must be not call if request not exist', async () => {
    agentCheckRequestExistStub.resolves(false)
    await accept(req, res, () => '')
    expect(agentAcceptStub.callCount).to.equal(0)
  })

  it('request not exist must be send error to middleware', async () => {
    agentCheckRequestExistStub.resolves(false)
    await accept(req, res, err => {
      expect(err.message).to.equal('Request not found')
      expect(err.status).to.equal(422)
    })
  })

  it('accept complete must be send Accept request completed message', async () => {
    await accept(req, res)
    sinon.assert.calledWith(resSendStub, {
      message: 'Accept request completed'
    })
  })

  afterEach(() => {
    resSendStub.restore()
    agentCheckRequestExistStub.restore()
    agentAcceptStub.restore()
  })
})
