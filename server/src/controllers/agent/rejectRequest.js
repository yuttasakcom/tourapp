import Agent from '../../models/agent'
import Company from '../../models/company'

export const rejectRequest = (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

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
  ]).then(() => {
    res.send({ message: 'Reject request completed' })
  })
}
