import { combineReducers } from 'redux'

import notification from './notification/reducers'
import booking from './booking/reducers'
import manageBooking from './manageBooking/reducers'
import company from './company/reducers'
import employee from './employee/reducers'
import dashboard from './dashboard/reducers'

export default combineReducers({
  notification,
  booking,
  company,
  manageBooking,
  employee,
  dashboard
})
