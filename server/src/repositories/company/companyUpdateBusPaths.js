const Company = require('../../models/company')

module.exports = (companyId, busPathId, hotelIds) =>
  Company.update(
    {
      _id: companyId,
      'busPaths._id': busPathId
    },
    {
      $addToSet: { 'busPaths.$.hotels': { $each: hotelIds } }
    }
  )
