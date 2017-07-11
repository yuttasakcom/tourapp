const Company = require('../../models/company')

module.exports = companyId =>
  Company.findById(companyId, {
    _id: 0,
    requestPendings: 1
  }).populate('requestPendings', 'email')
