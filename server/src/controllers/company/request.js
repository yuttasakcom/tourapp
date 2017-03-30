import Company from '../../models/company'
import Agent from '../../models/agent'

export default (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  Company
    .count({
      _id: companyId,
      agents: agentId,
    })
    .then(exist => {
      if (exist) {
        const err = new Error('This agent is already member')
        err.status = 422
        return next(err)
      }

      return Company
        .update({ _id: companyId }, {
          $addToSet: { requestPendings: agentId },
        })
        .then(({ nModified }) => {
          if (nModified) {
            return Agent
              .update({ _id: agentId }, {
                $addToSet: { acceptPendings: companyId },
              })
              .then(() => res.send({ message: 'Send request completed' }))
              .catch(next)
          }
          const err = new Error('This agent is already request')
          err.status = 422
          return next(err)
        })
        .catch(next)
    })
    .catch(next)
}
