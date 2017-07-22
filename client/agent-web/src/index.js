import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from './actions/axios'
import jwtDecode from 'jwt-decode'

import registerServiceWorker from './registerServiceWorker'
import App from './App'
import store from './store'
import { SIGN_IN_SUCCESS } from './actions/types'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/material-dashboard.css'

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
