const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const agentId = req.params.agentId
  const pkgs = await repo.companyGetSpecialPricesList(companyId, agentId)
  return res.send(pkgs)
}
