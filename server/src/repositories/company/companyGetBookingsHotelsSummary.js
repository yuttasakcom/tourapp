const mongoose = require('mongoose')
const moment = require('moment')

const ObjectId = mongoose.Types.ObjectId
const Booking = mongoose.model('Booking')
const Hotel = mongoose.model('Hotel')

module.exports = async (companyId, pkgId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10))
    .startOf('d')
    .toDate()
  const ltDate = moment(parseInt(dateEnd, 10))
    .startOf('d')
    .toDate()
  const results = await Booking.aggregate([
    {
      $match: {
        $and: [
          { company: ObjectId(companyId) },
          { 'pkg._id': ObjectId(pkgId) },
          { 'tourist.date': { $gte: gteDate, $lt: ltDate } }
        ]
      }
    },
    {
      $group: {
        _id: '$tourist.hotel',
        total: { $sum: { $add: ['$tourist.adult', '$tourist.child'] } }
      }
    },
    {
      $sort: { totalSeat: -1 }
    }
  ])

  return Hotel.populate(results, { path: '_id' })
}
