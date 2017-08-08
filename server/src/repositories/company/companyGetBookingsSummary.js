const ObjectId = require('mongoose').Types.ObjectId
const moment = require('moment')
const Booking = require('../../models/booking')

module.exports = (companyId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10)).toDate()
  const ltDate = moment(parseInt(dateEnd, 10)).toDate()
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
        totalAdultIncome: { $sum: '$pkg.priceAdult' },
        totalChildIncome: { $sum: '$pkg.priceChild' },
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
