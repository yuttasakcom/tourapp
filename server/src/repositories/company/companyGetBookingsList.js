const moment = require('moment')
const Booking = require('../../models/booking')

module.exports = (companyId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10)).toDate()
  const ltDate = moment(parseInt(dateEnd, 10)).toDate()
  return Booking.find({
    company: companyId,
    'tourist.date': { $gte: gteDate, $lt: ltDate }
  }).populate('agent', 'email name phoneNumber')
}
