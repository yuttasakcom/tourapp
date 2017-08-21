const Company = require('../../models/company')

module.exports = async (companyId, pkgId) => {
  const { busPaths } = await Company.findById(companyId, {
    busPaths: { $elemMatch: { pkg: pkgId } }
  }).populate('busPaths.hotels')
  return busPaths
}
