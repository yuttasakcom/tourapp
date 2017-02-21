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

    Agent.update({ _id: agentId }, {
        $addToSet: { 'requestPendings': companyId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Company.update({ _id: companyId }, {
              $addToSet: { 'acceptPendings': agentId }
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
  },

  accept(req, res, next) {
    const companyId = req.body._id
    const agentId = req.user._id

    Agent.update({ _id: agentId }, {
        $pull: { 'acceptPendings': companyId }
      })
      .then(({ nModified }) => {
        if (nModified) {
          Company.update({ _id: companyId }, {
              $pull: { 'requestPendings': agentId }
            })
            .then(() => {
              Promise.all([
                  Company.update({ _id: companyId }, {
                    $addToSet: { 'agents': agentId }
                  }),
                  Agent.update({ _id: agentId }, {
                    $addToSet: { 'companies': companyId }
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
}
