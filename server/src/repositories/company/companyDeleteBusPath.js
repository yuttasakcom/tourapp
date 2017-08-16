const Company = require('../../models/company')

module.exports = (companyId, busPathId) =>
  Company.update(
    { _id: companyId },
    { $pull: { busPaths: { _id: busPathId } } }
  )
