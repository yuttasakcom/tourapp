const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const acceptPendings = await repo.agentGetAcceptPendingsList(agentId)
  return res.send(acceptPendings)
}
