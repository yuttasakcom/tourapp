import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'

import auth from './auth/reducers'
import company from './companies/reducers'
import agent from '../../reducers/agents'

export default combineReducers({
  notifications,
  form,
  auth,
  company,
  agent
})
