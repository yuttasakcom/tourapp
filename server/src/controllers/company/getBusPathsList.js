const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const { pkgId } = req.query
  const busPaths = await repo.companyGetBusPathsList(companyId, pkgId)
  return res.send(busPaths)
}
