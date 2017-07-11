const Company = require('../../models/company')

module.exports = (companyId, agentId) =>
  Company.count({
    _id: companyId,
    agents: agentId
  })
