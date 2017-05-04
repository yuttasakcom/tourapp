import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

const epicMiddleware = createEpicMiddleware(rootEpic)

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = composeEnhancers(
  applyMiddleware(epicMiddleware),
)

const store = createStore(rootReducer, middlewares)

export default store
