import Agent from '../../models/agent'
import Company from '../../models/company'

export default (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id

  Promise.all([
    Agent.update({ _id: agentId }, {
      $pull: { requestPendings: companyId },
    }),
    Company.update({ _id: companyId }, {
      $pull: { acceptPendings: agentId },
    }),
  ]).then(() => {
    res.send({ message: 'Cancel request completed' })
  })
}
