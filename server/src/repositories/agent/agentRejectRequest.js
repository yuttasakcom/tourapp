const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = (agentId, companyId) =>
  Promise.all([
    Agent.update(
      { _id: agentId },
      {
        $pull: { acceptPendings: companyId }
      }
    ),
    Company.update(
      { _id: companyId },
      {
        $pull: { requestPendings: agentId }
      }
    )
  ])
