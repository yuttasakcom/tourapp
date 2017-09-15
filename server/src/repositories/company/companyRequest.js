const mongoose = require('mongoose')

const Company = mongoose.model('Company')
const Agent = mongoose.model('Agent')

module.exports = async (companyId, agentId) => {
  const [{ nModified }] = await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $addToSet: { requestPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $addToSet: { acceptPendings: companyId }
      }
    )
  ])
  return nModified
}
