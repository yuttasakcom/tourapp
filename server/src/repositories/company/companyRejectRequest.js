const mongoose = require('mongoose')

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

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
