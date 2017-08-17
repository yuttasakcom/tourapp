const Company = require('../../models/company')

module.exports = async (
  companyId,
  { busPathId, hotelIds, removedHotelIds }
) => {
  const find = {
    _id: companyId,
    'busPaths._id': busPathId
  }
  await Company.update(find, {
    $pullAll: { 'busPaths.$.hotels': removedHotelIds }
  })
  return Company.update(find, {
    $addToSet: { 'busPaths.$.hotels': { $each: hotelIds } }
  })
}
