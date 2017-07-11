const Agent = require('../../models/agent')

module.exports = async (agentId, companyId) =>
  Agent.count({
    _id: agentId,
    companies: companyId
  })
