import { combineReducers } from 'redux'

import pkg from '../../state/ducks/companies/pkg/reducers'
import agent from './agentReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import bookingSummary from './bookingSummaryReducer'
import dashboard from './dashboardReducer'
import printBusPath from '../../state/ducks/companies/printBusPath/reducers'
import busPath from '../../state/ducks/companies/busPath/reducers'

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
