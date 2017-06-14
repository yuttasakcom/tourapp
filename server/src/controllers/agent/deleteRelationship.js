import Company from '../../models/company'
import Agent from '../../models/agent'

export const deleteRelationship = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  await Promise.all([
    Company.update(
      { _id: companyId },
      {
        $pull: { agents: agentId }
      }
    ),
    Agent.update(
      { _id: agentId },
      {
        $pull: { companies: companyId }
      }
    )
  ])
  return res.send({ message: 'Delete relationship completed' })
}
