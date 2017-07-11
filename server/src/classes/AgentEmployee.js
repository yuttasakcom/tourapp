const repo = require('../../src/repositories')

class AgentEmployee {
  constructor(_id, agentId) {
    this._id = _id
    this.agentId = agentId
  }

  async book(bookingProps) {
    const exist = await repo.agentCheckMemberExist(
      this.agentId,
      bookingProps.company
    )

    if (!exist) {
      const err = new Error('This company is not member')
      err.status = 401
      throw err
    }

    bookingProps.agent = this.agentId
    bookingProps.employee = this._id
    return repo.book(bookingProps)
  }
}

module.exports = AgentEmployee
