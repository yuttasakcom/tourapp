import Agent from '../../models/agent'

export default (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, {
      _id: 0,
      requestPendings: 1,
    })
    .then(requestPendings => {
      res.send(requestPendings)
    })
}
