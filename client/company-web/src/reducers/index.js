import { combineReducers } from 'redux'

import company from './companies'
import agent from './agents'

export default combineReducers({
  company,
  agent
})
