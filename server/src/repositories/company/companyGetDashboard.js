const moment = require('moment')
const times = require('lodash/times')

const companyGetBookingsSummary = require('./companyGetBookingsSummary')

module.exports = companyId => {
  const queries = []
  times(9, index =>
    queries.push(
      companyGetBookingsSummary(
        companyId,
        moment().startOf('d').add(index, 'd').valueOf(),
        moment().startOf('d').add(index + 1, 'd').valueOf()
      )
    )
  )
  return Promise.all(queries)
}
