import { combineReducers } from 'redux'

import auth from './authReducer'
import company from './companies'
import agent from './agents'

export default combineReducers({
  auth,
  company,
  agent
})
