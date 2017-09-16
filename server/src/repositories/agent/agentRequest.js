const mongoose = require('mongoose')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

module.exports = async (agentId, companyId) => {
  const [{ nModified }] = await Promise.all([
    Agent.update(
      { _id: agentId },
      {
        $addToSet: { requestPendings: companyId }
      }
    ),
    Company.update(
      { _id: companyId },
      {
        $addToSet: { acceptPendings: agentId }
      }
    )
  ])
  return nModified
}
