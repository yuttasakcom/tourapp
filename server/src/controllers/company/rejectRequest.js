import Company from '../../models/company'
import Agent from '../../models/agent'

export const rejectRequest = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { acceptPendings: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { requestPendings: companyId }
      }
    )
  ])
  return res.send({ message: 'Reject request completed' })
}
