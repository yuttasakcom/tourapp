import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import notification from './notificationReducer'
import booking from './bookingReducer'
import manageBooking from './manageBookingReducer'
import company from './companyReducer'
import employee from './employeeReducer'

export default combineReducers({
  form,
  auth,
  notification,
  booking,
  company,
  manageBooking,
  employee
})
