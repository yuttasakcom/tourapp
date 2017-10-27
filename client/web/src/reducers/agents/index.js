import { combineReducers } from 'redux'

import notification from './notificationReducer'
import booking from './bookingReducer'
import manageBooking from './manageBookingReducer'
import company from './companyReducer'
import employee from './employeeReducer'
import dashboard from '../../state/ducks/agents/dashboard/reducers'

export default combineReducers({
  notification,
  booking,
  company,
  manageBooking,
  employee,
  dashboard
})
