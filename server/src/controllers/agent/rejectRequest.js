import Agent from '../../models/agent'
import Company from '../../models/company'

export const rejectRequest = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  await Promise.all([
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

  return res.send({ message: 'Reject request completed' })
}
