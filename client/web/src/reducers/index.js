import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'

import auth from './authReducer'
import company from './companies'
import agent from './agents'

export default combineReducers({
  notifications,
  form,
  auth,
  company,
  agent
})
