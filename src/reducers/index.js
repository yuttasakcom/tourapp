import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import pkg from './pkgReducer'
import agent from './agentReducer'

export default combineReducers({
  form,
  pkg,
  agent
})
