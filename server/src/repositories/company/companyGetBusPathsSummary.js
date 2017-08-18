const moment = require('moment')
const { flow, map, includes, forEach, toString, groupBy } = require('lodash/fp')

const Company = require('../../models/company')
const Booking = require('../../models/booking')

module.exports = async (companyId, date) => {
  const gteDate = moment(parseInt(date, 10)).startOf('d').toDate()
  const ltDate = moment(parseInt(date, 10)).add(1, 'd').startOf('d').toDate()
  const [{ busPaths }, bookings] = await Promise.all([
    Company.findById(companyId, {
      busPaths: 1,
      _id: 0
    }),
    Booking.find(
      {
        company: companyId,
        'tourist.date': { $gte: gteDate, $lt: ltDate }
      },
      { tourist: 1, _id: 0 }
    ).populate('tourist.hotel')
  ])
  const busPathsSummary = flow(
    map('tourist'),
    map(tourist => {
      forEach(busPath => {
        const busPathHotels = map(toString)(busPath.hotels)
        const touristHotel = tourist.hotel.id
        if (includes(touristHotel)(busPathHotels)) {
          tourist.busPathId = busPath.id
          tourist.busPathName = busPath.name
        }
      })(busPaths)
      return tourist
    }),
    groupBy('busPathName')
  )(bookings)
  return busPathsSummary
}
