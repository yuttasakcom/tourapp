const mongoose = require('mongoose')
const moment = require('moment')

const ObjectId = mongoose.Types.ObjectId
const Booking = mongoose.model('Booking')

module.exports = (companyId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10))
    .startOf('d')
    .toDate()
  const ltDate = moment(parseInt(dateEnd, 10))
    .startOf('d')
    .toDate()
  return Booking.aggregate([
    {
      $match: {
        $and: [
          { company: ObjectId(companyId) },
          { 'tourist.date': { $gte: gteDate, $lt: ltDate } }
        ]
      }
    },
    {
      $group: {
        _id: '$pkg.name',
        totalBooking: { $sum: 1 },
        totalAdultIncome: {
          $sum: { $multiply: ['$pkg.priceAdult', '$tourist.adult'] }
        },
        totalChildIncome: {
          $sum: { $multiply: ['$pkg.priceChild', '$tourist.child'] }
        },
        totalAdult: { $sum: '$tourist.adult' },
        totalChild: { $sum: '$tourist.child' }
      }
    },
    {
      $addFields: {
        totalSeat: { $add: ['$totalAdult', '$totalChild'] },
        totalIncome: { $add: ['$totalAdultIncome', '$totalChildIncome'] }
      }
    },
    {
      $sort: { totalSeat: -1 }
    }
  ])
}
