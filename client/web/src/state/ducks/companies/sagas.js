import { all } from 'redux-saga/effects'

import rootPkgSaga from './pkg/sagas'

export default function* rootSaga() {
  yield all([rootPkgSaga()])
}
