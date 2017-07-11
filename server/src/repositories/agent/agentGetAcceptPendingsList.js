const Agent = require('../../models/agent')

module.exports = agentId =>
  Agent.findById(agentId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email')
