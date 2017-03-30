import Agent from '../../models/agent'

export default (req, res, next) => {
  const agentId = req.user._id

  Agent
    .findById(agentId, {
      _id: 0,
      companies: 1,
    })
    .populate('companies')
    .then(agent => {
      res.send(agent.companies)
    })
    .catch(next)
}
