const Agent = require('../../models/agent')

module.exports = agentId =>
  Agent.findById(agentId, {
    _id: 0,
    requestPendings: 1
  }).populate('requestPendings', 'email')
