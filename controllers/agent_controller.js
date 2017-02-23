const Agent = require('../models/agent')
const Company = require('../models/company')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForAgent = (agent) => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    _id: agent._id,
    sub: agent.email,
    role: 'agent',
    iat: timestamp
  }, config.secret)
}


module.exports = {
  getPkgsList(req, res, next) {
    const agentId = req.user._id

    Company.find({ agents: agentId }, {
        email: 1,
        pkgs: 1
      })
      .then(companies => {
        res.send(companies)
      })
  },

  getCompaniesList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, {
        _id: 0,
        companies: 1
      })
      .populate('companies')
      .then(agent => {
        res.send(agent.companies)
      })
      .catch(next)
  },

  signup(req, res, next) {
    const agentProps = req.body
    const agent = new Agent(agentProps)
    const validationErr = agent.validateSync()
    if (validationErr) {
      let err = new Error('Must provide email and password')
      err.status = 422
      return next(err)
    }
    agent.save()
      .then(agent => res.status(201).send({ token: tokenForAgent(agent) }))
      .catch(next)
  },

  signin(req, res, next) {
    res.send({ token: tokenForAgent(req.user) })
  },

  profile(req, res, next) {
    res.send({ message: 'realy secret' })
  },

  request(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Agent.count({ _id: agentId, companies: companyId })
      .then(exist => {
        if (exist) {
          let err = new Error('This company is already member')
          err.status = 422
          return next(err)
        }

        Agent.update({ _id: agentId }, {
            $addToSet: { requestPendings: companyId }
          })
          .then(({ nModified }) => {
            if (nModified) {
              Company.update({ _id: companyId }, {
                  $addToSet: { acceptPendings: agentId }
                })
                .then(() => res.send({ message: 'Send request completed' }))
                .catch(next)
            } else {
              let err = new Error('This company is already request')
              err.status = 422
              return next(err)
            }
          })
          .catch(next)
      })
      .catch(next)
  },

  accept(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Agent.update({ _id: agentId }, {
        $pull: { acceptPendings: companyId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Company.update({ _id: companyId }, {
              $pull: { requestPendings: agentId }
            })
            .then(() => {
              Promise.all([
                  Company.update({ _id: companyId }, {
                    $addToSet: { agents: agentId }
                  }),
                  Agent.update({ _id: agentId }, {
                    $addToSet: { companies: companyId }
                  })
                ])
                .then(() => {
                  res.send({ message: 'Accept request completed' })
                })
            })
        } else {
          let err = new Error('Request not found')
          err.status = 422
          next(err)
        }
      })
  },

  getRequestPendingsList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, { _id: 0, requestPendings: 1 })
      .then(requestPendings => {
        res.send(requestPendings)
      })
  },

  getAcceptPendingsList(req, res, next) {
    const agentId = req.user._id

    Agent.findById(agentId, { _id: 0, acceptPendings: 1 })
      .then(acceptPendings => {
        res.send(acceptPendings)
      })
  },

  cancelRequest(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Promise.all([
      Agent.update({ _id: agentId }, {
        $pull: { requestPendings: companyId }
      }),
      Company.update({ _id: companyId }, {
        $pull: { acceptPendings: agentId }
      })
    ]).then(() => {
      res.send({ message: 'Cancel request completed' })
    })
  },

  rejectRequest(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Promise.all([
      Agent.update({ _id: agentId }, {
        $pull: { acceptPendings: companyId }
      }),
      Company.update({ _id: companyId }, {
        $pull: { requestPendings: agentId }
      })
    ]).then(() => {
      res.send({ message: 'Reject request completed' })
    })
  }
}
