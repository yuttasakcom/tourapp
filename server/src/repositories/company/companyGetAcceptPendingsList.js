const Company = require('mongoose').model('Company')

module.exports = companyId =>
  Company.findById(companyId, {
    _id: 0,
    acceptPendings: 1
  }).populate('acceptPendings', 'email name')
