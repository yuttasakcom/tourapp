import { combineReducers } from 'redux'

import notification from './notificationReducer'
import booking from '../../state/ducks/agents/booking/reducers'
import manageBooking from '../../state/ducks/agents/manageBooking/reducers'
import company from './companyReducer'
import employee from '../../state/ducks/agents/employee/reducers'
import dashboard from '../../state/ducks/agents/dashboard/reducers'

export default combineReducers({
  notification,
  booking,
  company,
  manageBooking,
  employee,
  dashboard
})
