const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const busPaths = await repo.companyGetBusPathsList(companyId)
  return res.send(busPaths)
}
