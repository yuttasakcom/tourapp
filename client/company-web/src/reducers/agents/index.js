import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'

import auth from './authReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import manageBooking from './manageBookingReducer'
import company from './companyReducer'
import employee from './employeeReducer'
import dashboard from './dashboardReducer'

export default combineReducers({
  notifications,
  form,
  auth,
  notification,
  booking,
  company,
  manageBooking,
  employee,
  dashboard
})
