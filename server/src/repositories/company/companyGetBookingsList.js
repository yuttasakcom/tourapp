const moment = require('moment')
const Booking = require('../../models/booking')

module.exports = (companyId, date) => {
  const gteDate = moment(parseInt(date, 10)).toDate()
  const ltDate = moment(gteDate).add(1, 'days').toDate()
  return Booking.find({
    company: companyId,
    'tourist.date': { $gte: gteDate, $lt: ltDate }
  }).populate('agent', 'email name')
}
