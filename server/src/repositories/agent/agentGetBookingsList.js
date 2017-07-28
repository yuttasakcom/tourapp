const Booking = require('../../models/booking')
const moment = require('moment')

module.exports = (agentId, date) => {
  const gteDate = moment(parseInt(date, 10))
  const ltDate = moment(gteDate).add(1, 'days')
  return Booking.find({
    agent: agentId,
    'tourist.date': { $gte: gteDate, $lt: ltDate }
  }).populate({
    path: 'company',
    select: 'email name'
  })
}
