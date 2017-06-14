import Company from '../../models/company'
import Agent from '../../models/agent'

export const accept = async (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  const { nModified } = await Company.update(
    { _id: companyId },
    {
      $pull: { acceptPendings: agentId }
    }
  )

  if (!nModified) {
    const err = new Error('Request not found')
    err.status = 422
    return next(err)
  }

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

  await Promise.all([
    removeAgentRequestPendings,
    addAgentToCompany,
    addCompanyToAgent
  ])

  return res.send({ message: 'Accept request completed' })
}
