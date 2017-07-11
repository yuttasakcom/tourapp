const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  req.body.company = companyId
  const pkgProps = req.body
  const pkg = await repo.companyAddPkg(pkgProps)
  return res.status(201).send(pkg)
}
