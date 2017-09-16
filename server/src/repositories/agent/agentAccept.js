const mongoose = require('mongoose')

const Agent = mongoose.model('Agent')
const Company = mongoose.model('Company')

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
