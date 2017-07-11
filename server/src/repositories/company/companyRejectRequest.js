const Company = require('../../models/company')
const Agent = require('../../models/agent')

module.exports = (companyId, agentId) =>
  Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { acceptPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { requestPendings: companyId }
      }
    )
  ])
