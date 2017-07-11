const repo = require('../repositories')

class Agent {
  constructor(_id) {
    this._id = _id
  }

  async rejectRequest(companyId) {
    await repo.agentRejectRequest(this._id, companyId)
  }

  async accept(companyId) {
    const exist = await repo.agentCheckRequestExist(this._id, companyId)

    if (!exist) {
      const err = new Error('Request not found')
      err.status = 422
      throw err
    }

    await repo.agentAccept(this._id, companyId)
  }

  async book(bookingProps) {
    const exist = await repo.agentCheckMemberExist(
      this._id,
      bookingProps.company
    )

    if (!exist) {
      const err = new Error('This company is not member')
      err.status = 401
      throw err
    }

    bookingProps.agent = this._id
    return repo.agentAddBooking(bookingProps)
  }
}

module.exports = Agent
