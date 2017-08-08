const moment = require('moment')

const companyGetBookingsSummary = require('./companyGetBookingsSummary')

module.exports = companyId =>
  Promise.all([
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').valueOf(),
      moment().startOf('d').add(1, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(1, 'd').valueOf(),
      moment().startOf('d').add(2, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(2, 'd').valueOf(),
      moment().startOf('d').add(3, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(3, 'd').valueOf(),
      moment().startOf('d').add(4, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(4, 'd').valueOf(),
      moment().startOf('d').add(5, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(5, 'd').valueOf(),
      moment().startOf('d').add(6, 'd').valueOf()
    ),
    companyGetBookingsSummary(
      companyId,
      moment().startOf('d').add(6, 'd').valueOf(),
      moment().startOf('d').add(7, 'd').valueOf()
    )
  ])
