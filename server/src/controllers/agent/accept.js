import Agent from '../../models/agent'
import Company from '../../models/company'

export const accept = async (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

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

  if (!nModified) {
    const err = new Error('Request not found')
    err.status = 422
    return next(err)
  }

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

  return res.send({
    message: 'Accept request completed'
  })
}
