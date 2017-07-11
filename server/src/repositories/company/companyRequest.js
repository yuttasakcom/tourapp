const Company = require('../../models/company')
const Agent = require('../../models/agent')

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
