import { all } from 'redux-saga/effects'

import rootPkgSaga from './pkg/sagas'
import rootBusPathSaga from './busPath/sagas'

export default function* rootSaga() {
  yield all([rootPkgSaga(), rootBusPathSaga()])
}
