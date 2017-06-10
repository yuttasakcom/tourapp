import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import pkg from './pkgReducer'

export default combineReducers({
  form,
  pkg
})
