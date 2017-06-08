import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import ui from './ui'
import pkgs from './pkgReducer'

export default combineReducers({
  form,
  pkgs,
  ui
})
