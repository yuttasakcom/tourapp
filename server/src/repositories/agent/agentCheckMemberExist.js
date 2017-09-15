const Agent = require('mongoose').model('Agent')

module.exports = async (agentId, companyId) =>
  Agent.count({
    _id: agentId,
    companies: companyId
  })
