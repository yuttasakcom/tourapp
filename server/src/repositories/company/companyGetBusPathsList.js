const Company = require('../../models/company')

module.exports = async companyId => {
  const { busPaths } = await Company.findById(companyId, {
    busPaths: 1
  }).populate('busPaths.hotels')
  return busPaths
}
