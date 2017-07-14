const sinon = require('sinon')

const getAcceptPendingsList = require('../../../../src/controllers/agent/getAcceptPendingsList')
const repo = require('../../../../src/repositories')

describe('agent getAcceptPendingsList controller', () => {
  const req = { user: { _id: 'agentId' } }
  const res = { send: () => '' }
  let resSendStub
  let agentGetAcceptPendingsListStub

  beforeEach(() => {
    resSendStub = sinon.spy(res, 'send')
    agentGetAcceptPendingsListStub = sinon
      .stub(repo, 'agentGetAcceptPendingsList')
      .resolves(true)
  })

  it('agentGetAcceptPendingsList must be called once', async () => {
    await getAcceptPendingsList(req, res)
    sinon.assert.calledOnce(agentGetAcceptPendingsListStub)
  })

  it('agentGetAcceptPendingsList must be called with agentId', async () => {
    await getAcceptPendingsList(req, res)
    sinon.assert.calledWith(agentGetAcceptPendingsListStub, 'agentId')
  })

  it('getAcceptPendingsList complete must be return data', async () => {
    await getAcceptPendingsList(req, res)
    sinon.assert.calledWith(resSendStub, true)
  })

  afterEach(() => {
    resSendStub.restore()
    agentGetAcceptPendingsListStub.restore()
  })
})
