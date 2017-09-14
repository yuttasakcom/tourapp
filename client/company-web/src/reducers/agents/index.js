import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'

import notification from './notificationReducer'
import booking from './bookingReducer'
import manageBooking from './manageBookingReducer'
import company from './companyReducer'
import employee from './employeeReducer'
import dashboard from './dashboardReducer'

export default combineReducers({
  notifications,
  notification,
  booking,
  company,
  manageBooking,
  employee,
  dashboard
})
