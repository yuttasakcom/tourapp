const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = (companyId, agentId) =>
  Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { requestPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { acceptPendings: companyId }
      }
    )
  ])
