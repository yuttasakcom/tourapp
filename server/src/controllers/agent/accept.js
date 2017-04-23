import Agent from '../../models/agent'
import Company from '../../models/company'

export default (req, res, next) => {
  const companyId = req.body._id
  const agentId = req.user._id

  Agent
    .update({
      _id: agentId,
    }, {
      $pull: {
        acceptPendings: companyId,
      },
    })
    .then(({
      nModified,
    }) => {
      if (nModified) {
        Company
          .update({
            _id: companyId,
          }, {
            $pull: {
              requestPendings: agentId,
            },
          })
          .then(() => {
            const addAgentToCompany = Company
              .update({
                _id: companyId,
              }, {
                $addToSet: {
                  agents: agentId,
                },
              })

            const addCompanyToAgent = Agent
              .update({
                _id: agentId,
              }, {
                $addToSet: {
                  companies: companyId,
                },
              })

            Promise.all([addAgentToCompany, addCompanyToAgent])
              .then(() => {
                res.send({
                  message: 'Accept request completed',
                })
              })
          })
      } else {
        const err = new Error('Request not found')
        err.status = 422
        next(err)
      }
    })
}
