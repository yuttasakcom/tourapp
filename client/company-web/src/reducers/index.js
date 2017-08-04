import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import layout from './layoutReducer'
import auth from './authReducer'
import pkg from './pkgReducer'
import agent from './agentReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import bookingSummary from './bookingSummaryReducer'
import dashboard from './dashboardReducer'

export default combineReducers({
  form,
  layout,
  auth,
  pkg,
  agent,
  notification,
  booking,
  bookingSummary,
  dashboard
})
