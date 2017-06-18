import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import notification from './notificationReducer'

export default combineReducers({
  form,
  auth,
  notification
})
