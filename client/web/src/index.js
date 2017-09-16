import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import cookie from 'cookie'
import 'moment/locale/th'

import registerServiceWorker from './registerServiceWorker'
import Apps from './apps'
import store from './store'
import { SIGN_IN_SUCCESS } from './actions/types'

import './resources/css/material-icons.css'
import './resources/css/roboto-font.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/material-dashboard.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-select/dist/react-select.css'
import './resources/css/index.css'

moment.locale('th')
const token = cookie.parse(document.cookie).jwt

if (token) {
  const user = jwtDecode(token)
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: user
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Apps />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
