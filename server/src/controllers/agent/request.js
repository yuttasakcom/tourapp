import Agent from '../../models/agent'
import Company from '../../models/company'

export const request = (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  Agent.count({ _id: agentId, companies: companyId })
    .then(exist => {
      if (exist) {
        const err = new Error('This company is already member')
        err.status = 422
        return next(err)
      }

      return Agent.update(
        { _id: agentId },
        {
          $addToSet: { requestPendings: companyId }
        }
      )
        .then(({ nModified }) => {
          if (nModified) {
            return Company.update(
              { _id: companyId },
              {
                $addToSet: { acceptPendings: agentId }
              }
            )
              .then(() => res.send({ message: 'Send request completed' }))
              .catch(next)
          }
          const err = new Error('This company is already request')
          err.status = 422
          return next(err)
        })
        .catch(next)
    })
    .catch(next)
}
