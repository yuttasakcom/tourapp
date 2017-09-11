import { combineReducers } from 'redux'

import layout from './layoutReducer'
import company from './companies'
import agent from './agents'

export default combineReducers({
  layout,
  company,
  agent
})
