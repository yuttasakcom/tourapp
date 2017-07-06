const Company = require('../../models/company')

module.exports = async (req, res, next) => {
  const companyId = req.user._id

  const acceptPendings = await Company.findById(companyId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email')
  return res.send(acceptPendings)
}
