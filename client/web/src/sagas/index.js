import { all } from 'redux-saga/effects'

import watchAuth from './authSaga/authSaga'

export default function* rootSaga() {
  yield all([watchAuth()])
}
