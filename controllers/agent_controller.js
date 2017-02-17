const Agent = require('../models/agent')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForAgent = (agent) => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: agent.email,
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
    res.send({ token: 'wat?' })
  }
}
