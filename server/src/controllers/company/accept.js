import Company from '../../models/company'
import Agent from '../../models/agent'

export default (req, res, next) => {
  const agentId = req.body._id
  const companyId = req.user._id

  Company
    .update({ _id: companyId }, {
      $pull: { acceptPendings: agentId },
    })
    .then(({ nModified }) => {
      if (nModified) {
        Agent
          .update({ _id: agentId }, {
            $pull: { requestPendings: companyId },
          })
          .then(() => {
            const addAgentToCompany = Company
              .update({ _id: companyId }, {
                $addToSet: { agents: agentId },
              })

            const addCompanyToAgent = Agent
              .update({ _id: agentId }, {
                $addToSet: { companies: companyId },
              })

            Promise.all([addAgentToCompany, addCompanyToAgent])
              .then(() => {
                res.send({ message: 'Accept request completed' })
              })
          })
      } else {
        const err = new Error('Request not found')
        err.status = 422
        next(err)
      }
    })
}
