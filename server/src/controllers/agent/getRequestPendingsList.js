const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const requestPendings = await repo.agentGetRequestPendingsList(agentId)
  return res.send(requestPendings)
}
