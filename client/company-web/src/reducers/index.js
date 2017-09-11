import { combineReducers } from 'redux'

import layout from './layoutReducer'
import auth from './authReducer'
import company from './companies'
import agent from './agents'

export default combineReducers({
  auth,
  layout,
  company,
  agent
})
