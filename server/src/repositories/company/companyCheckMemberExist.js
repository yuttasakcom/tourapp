const Company = require('mongoose').model('Company')

module.exports = (companyId, agentId) =>
  Company.count({
    _id: companyId,
    agents: agentId
  })
