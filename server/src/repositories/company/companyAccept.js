const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = async (companyId, agentId) => {
  const removeAgentRequestPendings = Agent.update(
    { _id: agentId },
    {
      $pull: { requestPendings: companyId }
    }
  )
  const addAgentToCompany = Company.update(
    { _id: companyId },
    {
      $addToSet: { agents: agentId }
    }
  )
  const addCompanyToAgent = Agent.update(
    { _id: agentId },
    {
      $addToSet: { companies: companyId }
    }
  )
  return Promise.all([
    removeAgentRequestPendings,
    addAgentToCompany,
    addCompanyToAgent
  ])
}
