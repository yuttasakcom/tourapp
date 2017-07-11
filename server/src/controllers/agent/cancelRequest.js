const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const companyId = req.params.id
  await repo.agentCancelRequest(agentId, companyId)
  return res.send({ message: 'Cancel request completed' })
}
