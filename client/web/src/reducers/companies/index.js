import { combineReducers } from 'redux'

import pkg from '../../state/ducks/companies/pkg/reducers'
import agent from './agentReducer'
import notification from './notificationReducer'
import booking from '../../state/ducks/companies/booking/reducers'
import bookingSummary from '../../state/ducks/companies/bookingSummary/reducers'
import dashboard from '../../state/ducks/companies/dashboard/reducers'
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
