const Booking = require('../../models/booking')
const moment = require('moment')

module.exports = (agentId, dateStart, dateEnd) => {
  const gteDate = moment(parseInt(dateStart, 10)).toDate()
  const ltDate = moment(parseInt(dateEnd, 10)).toDate()
  return Booking.find({
    agent: agentId,
    'tourist.date': { $gte: gteDate, $lt: ltDate }
  }).populate({
    path: 'company',
    select: 'email name phoneNumber'
  })
}
