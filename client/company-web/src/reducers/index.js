import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'

import layout from './layoutReducer'
import auth from './authReducer'
import pkg from './pkgReducer'
import agent from './agentReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import bookingSummary from './bookingSummaryReducer'
import dashboard from './dashboardReducer'
import printBusPath from './printBusPathReducer'
import busPath from './busPathReducer'

export default combineReducers({
  notifications,
  form,
  layout,
  auth,
  pkg,
  agent,
  notification,
  booking,
  bookingSummary,
  dashboard,
  printBusPath,
  busPath
})
