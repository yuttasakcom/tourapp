const Agent = require('../models/agent')
const Company = require('../models/company')

exports.agentCheckMemberExist = async (agentId, companyId) =>
  Agent.count({
    _id: agentId,
    companies: companyId
  })

exports.agentAccept = async (agentId, companyId) => {
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

exports.agentRejectRequest = (agentId, companyId) =>
  Promise.all([
    Agent.update(
      { _id: agentId },
      {
        $pull: { acceptPendings: companyId }
      }
    ),
    Company.update(
      { _id: companyId },
      {
        $pull: { requestPendings: agentId }
      }
    )
  ])

exports.agentCheckRequestExist = async (agentId, companyId) => {
  const { nModified } = await Agent.update(
    {
      _id: agentId
    },
    {
      $pull: {
        acceptPendings: companyId
      }
    }
  )
  return nModified
}
