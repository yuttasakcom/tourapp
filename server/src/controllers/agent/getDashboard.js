const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const dashboard = await repo.agentGetDashboard(agentId)
  return res.send(dashboard)
}
