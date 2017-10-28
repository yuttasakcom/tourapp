import { combineReducers } from 'redux'

import pkg from './pkg/reducers'
import agent from './agent/reducers'
import notification from './notification/reducers'
import booking from './booking/reducers'
import bookingSummary from './bookingSummary/reducers'
import dashboard from './dashboard/reducers'
import printBusPath from './printBusPath/reducers'
import busPath from './busPath/reducers'

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
