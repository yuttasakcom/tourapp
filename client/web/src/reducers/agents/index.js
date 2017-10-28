import { combineReducers } from 'redux'

import notification from '../../state/ducks/agents/notification/reducers'
import booking from '../../state/ducks/agents/booking/reducers'
import manageBooking from '../../state/ducks/agents/manageBooking/reducers'
import company from '../../state/ducks/agents/company/reducers'
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
