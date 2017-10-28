import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import reducers from './ducks/reducers'
import rootSaga from './ducks/sagas'

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const middlewares = composeEnhancers(
  applyMiddleware(routerMiddleware(history), ReduxThunk, sagaMiddleware)
)
const store = createStore(connectRouter(history)(reducers), middlewares)
sagaMiddleware.run(rootSaga)

export default store
