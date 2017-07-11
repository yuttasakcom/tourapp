const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id
  await repo.companyDeletePkg(pkgId)
  return res.send({ message: 'Delete package completed' })
}
