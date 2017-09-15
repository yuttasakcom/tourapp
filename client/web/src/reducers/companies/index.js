import { combineReducers } from 'redux'

import pkg from './pkgReducer'
import agent from './agentReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import bookingSummary from './bookingSummaryReducer'
import dashboard from './dashboardReducer'
import printBusPath from './printBusPathReducer/index'
import busPath from './busPathReducer'

export default combineReducers({
  pkg,
  agent,
  notification,
  booking,
  bookingSummary,
  dashboard,
  printBusPath,
  busPath
})
