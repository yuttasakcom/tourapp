const Booking = require('mongoose').model('Booking')
const moment = require('moment')

module.exports = (agentId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10)).toDate()
  const ltDate = moment(parseInt(dateEnd, 10)).toDate()
  return Booking.find({
    agent: agentId,
    'tourist.date': { $gte: gteDate, $lt: ltDate }
  })
    .populate('company', 'email name phoneNumber')
    .populate('tourist.hotel', 'name')
}
