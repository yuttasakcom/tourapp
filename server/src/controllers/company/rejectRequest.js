const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.id
  await repo.companyRejectRequest(companyId, agentId)
  return res.send({ message: 'Reject request completed' })
}
