const moment = require('moment')
const Booking = require('../../models/booking')

module.exports = (companyId, date) => {
  const gteDate = moment(parseInt(date, 10))
  const ltDate = moment(gteDate).add(1, 'days')
  return Booking.aggregate([
    {
      $match: {
        company: companyId,
        'tourist.date': { $gte: gteDate, $lt: ltDate }
      }
    },
    {
      $group: {
        _id: '$_id',
        total: { $sum: '$pkg.adult' }
      }
    }
  ])
}
