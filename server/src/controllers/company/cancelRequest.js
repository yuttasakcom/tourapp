import Company from '../../models/company'
import Agent from '../../models/agent'

export default (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id

  Promise.all([
    Company.update({ _id: companyId }, {
      $pull: { requestPendings: agentId },
    }),
    Agent.update({ _id: agentId }, {
      $pull: { acceptPendings: companyId },
    }),
  ]).then(() => {
    res.send({ message: 'Cancel request completed' })
  })
}
