import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import packages from './packageReducer'

export default combineReducers({
  form,
  packages
})
