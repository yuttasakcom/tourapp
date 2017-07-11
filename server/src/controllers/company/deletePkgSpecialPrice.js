const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const { pkgId, agentId } = req.params
  await repo.companyDeletePkgSpecialPrice(pkgId, agentId)
  res.send({ message: 'Reset price completed' })
}
