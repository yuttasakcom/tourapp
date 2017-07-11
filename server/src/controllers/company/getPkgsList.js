const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const pkgs = await repo.companyGetPkgsList(companyId)
  res.set('Content-Range', pkgs.length)
  return res.send(pkgs)
}
