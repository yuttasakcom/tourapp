const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = (agentId, companyId) =>
  Promise.all([
    Agent.update(
      { _id: agentId },
      {
        $pull: { requestPendings: companyId }
      }
    ),
    Company.update(
      { _id: companyId },
      {
        $pull: { acceptPendings: agentId }
      }
    )
  ])
