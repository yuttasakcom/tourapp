const Company = require('../../models/company')

module.exports = companyId =>
  Company.findById(companyId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email name')
