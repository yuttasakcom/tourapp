const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const acceptPendings = await repo.companyGetAcceptPendingsList(companyId)
  return res.send(acceptPendings)
}
