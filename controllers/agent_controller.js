const Agent = require('../models/agent')

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
      .then(agent => res.status(201).send({ token: 'wat?' }))
      .catch(next)
  },

  signin(req, res, next) {
    res.send({ token: 'wat?' })
  }
}
