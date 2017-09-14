import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import company from './companies'
import agent from './agents'

export default combineReducers({
  form,
  auth,
  company,
  agent
})
