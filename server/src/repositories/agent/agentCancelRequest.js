const mongoose = require('mongoose')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

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
