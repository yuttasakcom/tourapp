const moment = require('moment')
const times = require('lodash/times')

const companyGetBookingsSummary = require('./companyGetBookingsSummary')

module.exports = companyId => {
  const queries = []
  times(9, index =>
    queries.push(
      companyGetBookingsSummary(
        companyId,
        moment().add(index, 'd').valueOf(),
        moment().add(index + 1, 'd').valueOf()
      )
    )
  )
  return Promise.all(queries)
}
