const repo = require('../repositories')

class Agent {
  constructor(_id) {
    this._id = _id
  }

  async rejectRequest(companyId) {
    await repo.agentRejectRequest(this._id, companyId)
  }

  async checkMemberExist(companyId) {
    const exist = await repo.agentCheckMemberExist(this._id, companyId)
    return exist
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

  book(bookingProps) {
    bookingProps.agent = this._id
    return repo.book(bookingProps)
  }
}

module.exports = Agent
