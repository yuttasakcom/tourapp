const Agent = require('../../models/agent')
const Company = require('../../models/company')

module.exports = async (agentId, companyId) => {
  const removeCompannyRequestPendings = Company.update(
    {
      _id: companyId
    },
    {
      $pull: {
        requestPendings: agentId
      }
    }
  )

  const addAgentToCompany = Company.update(
    {
      _id: companyId
    },
    {
      $addToSet: {
        agents: agentId
      }
    }
  )

  const addCompanyToAgent = Agent.update(
    {
      _id: agentId
    },
    {
      $addToSet: {
        companies: companyId
      }
    }
  )

  await Promise.all([
    removeCompannyRequestPendings,
    addAgentToCompany,
    addCompanyToAgent
  ])
}
