const BusPath = require('mongoose').model('BusPath')

module.exports = (companyId, pkgId) =>
  BusPath.find({ company: companyId, pkg: pkgId }).populate('hotels')
