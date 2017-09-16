const mongoose = require('mongoose')

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

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
