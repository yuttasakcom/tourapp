const BusPath = require('../../models/busPath')

module.exports = (companyId, pkgId) =>
  BusPath.find({ company: companyId, pkg: pkgId }).populate('hotels')
