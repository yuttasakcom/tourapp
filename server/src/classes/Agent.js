const repo = require('../repositories')

class Agent {
  constructor(_id) {
    this._id = _id
  }

  async rejectRequest(companyId) {
    await repo.agentRejectRequest(this._id, companyId)
  }

  async checkRequestExist(companyId) {
    const exist = await repo.agentCheckRequestExist(this._id, companyId)
    return exist
  }

  async accept(companyId) {
    await repo.agentAccept(this._id, companyId)
  }
}

module.exports = Agent
