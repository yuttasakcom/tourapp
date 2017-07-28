import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import 'moment/locale/th'

import axios from './actions/axios'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import store from './store'
import { SIGN_IN_SUCCESS } from './actions/types'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/material-dashboard.css'
import 'react-dates/lib/css/_datepicker.css'
import './resources/css/index.css'

moment.locale('th')
const token = localStorage.getItem('token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
  const user = jwtDecode(token)
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: user
  })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
