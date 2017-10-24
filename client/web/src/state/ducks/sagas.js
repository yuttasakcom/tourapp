import { all } from 'redux-saga/effects'

import watchAuth from './auth/sagas'
import companySagas from './companies/sagas'

export default function* rootSaga() {
  yield all([watchAuth(), companySagas()])
}
