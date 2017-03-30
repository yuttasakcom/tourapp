import Agent from '../../models/agent'

export default (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, { _id: 0, acceptPendings: 1 })
    .then(acceptPendings => {
      res.send(acceptPendings)
    })
}
