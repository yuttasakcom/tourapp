const Company = require('../../models/company')

module.exports = async (
  companyId,
  { busPathId, hotelIds, removedHotelIds }
) => {
  await Company.update(
    {
      _id: companyId,
      'busPaths._id': busPathId
    },
    {
      $pullAll: { 'busPaths.$.hotels': removedHotelIds }
    }
  )
  return Company.update(
    {
      _id: companyId,
      'busPaths._id': busPathId
    },
    {
      $addToSet: { 'busPaths.$.hotels': { $each: hotelIds } }
    }
  )
}
