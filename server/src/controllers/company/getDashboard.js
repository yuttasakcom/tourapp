const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const dashboard = await repo.companyGetDashboard(companyId)
  return res.send(dashboard)
}
