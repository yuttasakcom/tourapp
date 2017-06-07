import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import './resources/css/material-kit.css'
import './resources/css/material-dashboard.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = composeEnhancers(applyMiddleware(ReduxThunk))
const store = createStore(reducers, middlewares)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
