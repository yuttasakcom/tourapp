const sinon = require('sinon')
const addBooking = require('../../../../src/controllers/agent_employee/addBooking')
const AgentEmployee = require('../../../../src/classes/AgentEmployee')

describe('agent_employee addBooking controller', () => {
  const req = {
    user: { _id: 'agentEmployeeId', agentId: 'agentId' },
    body: { _id: 'companyId' }
  }
  const res = { send: () => '' }
  let book

  beforeEach(() => {
    book = sinon.stub(AgentEmployee.prototype, 'book').resolves(req.body)
  })

  it('agentEmployee.book must be called once', async () => {
    await addBooking(req, res)
    sinon.assert.calledOnce(book)
  })

  it('agentEmployee.book must be called with bookProps', async () => {
    await addBooking(req, res)
    sinon.assert.calledWith(book, { _id: 'companyId' })
  })

  it('res.send must be called with bookProps', async () => {
    const sendStub = sinon.spy(res, 'send')
    await addBooking(req, res)
    sendStub.restore()
    sinon.assert.calledWith(sendStub, { _id: 'companyId' })
  })

  afterEach(() => {
    book.restore()
  })
})
