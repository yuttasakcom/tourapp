const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user.agentId
  const pkgs = await repo.agentGetPkgsList(agentId)
  return res.send(pkgs)
}
