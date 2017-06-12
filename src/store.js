import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = composeEnhancers(applyMiddleware(ReduxThunk))
const store = createStore(reducers, middlewares)

export default store
