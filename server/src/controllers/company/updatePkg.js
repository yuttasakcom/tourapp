const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id
  const pkgProps = req.body
  try {
    const pkg = await repo.companyUpdatePkg(pkgId, pkgProps)
    return res.send(pkg)
  } catch (e) {
    return next(e)
  }
}
