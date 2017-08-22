const BusPath = require('../../models/busPath')

module.exports = async ({ busPathId, hotelIds, removedHotelIds }) => {
  const find = { _id: busPathId }
  await BusPath.update(find, {
    $pullAll: { hotels: removedHotelIds }
  })
  return BusPath.update(find, {
    $addToSet: { hotels: { $each: hotelIds } }
  })
}
