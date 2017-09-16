const Agent = require('mongoose').model('Agent')

module.exports = agentId =>
  Agent.findById(agentId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email name')
