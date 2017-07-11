const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const pkgId = req.params.id
  try {
    const pkg = await repo.companyGetPkg(pkgId)
    return res.send(pkg)
  } catch (e) {
    return next(e)
  }
}
