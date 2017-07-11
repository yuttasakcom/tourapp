const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = (companyId, agentId) =>
  Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { agents: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { companies: companyId }
      }
    )
  ])
