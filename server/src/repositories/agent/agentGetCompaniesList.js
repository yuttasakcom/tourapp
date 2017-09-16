const Agent = require('mongoose').model('Agent')

module.exports = agentId =>
  Agent.findById(agentId, {
    _id: 0,
    companies: 1
  }).populate('companies')
