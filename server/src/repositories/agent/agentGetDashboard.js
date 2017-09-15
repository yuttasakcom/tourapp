const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId
const Booking = mongoose.model('Booking')

module.exports = agentId =>
  Booking.aggregate([
    {
      $match: { agent: ObjectId(agentId) }
    },
    {
      $group: {
        _id: '$pkg.name',
        totalBooking: { $sum: 1 },
        totalAdultCost: { $sum: '$pkg.priceAdult' },
        totalChildCost: { $sum: '$pkg.priceChild' },
        totalAdult: { $sum: '$tourist.adult' },
        totalChild: { $sum: '$tourist.child' }
      }
    },
    {
      $addFields: {
        totalSeat: { $add: ['$totalAdult', '$totalChild'] },
        totalCost: { $add: ['$totalAdultCost', '$totalChildCost'] }
      }
    },
    {
      $sort: { totalSeat: -1 }
    }
  ])
