const Agent = require('../../models/agent')
const Company = require('../../models/company')

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
