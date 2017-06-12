import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import pkg from './pkgReducer'
import agent from './agentReducer'
import notification from './notificationReducer'

export default combineReducers({
  form,
  auth,
  pkg,
  agent,
  notification
})
