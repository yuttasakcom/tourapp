const Agent = require('../models/agent')

module.exports = {
  signup(req, res, next) {
    const agentProps = req.body
    const agent = new Agent(agentProps)
    agent.save()
      .then(agent => res.status(201).send({ token: 'wat?' }))
      .catch(next)
  }
}
