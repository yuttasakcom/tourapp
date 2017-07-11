const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const requestPendings = await repo.companyGetRequestPendingsList(companyId)
  return res.send(requestPendings)
}
