import { all } from 'redux-saga/effects'

import rootPkgSaga from './pkg/sagas'
import rootBusPathSaga from './busPath/sagas'
import rootPrintBusPathSaga from './printBusPath/sagas'
import rootDashboardSaga from './dashboard/sagas'

export default function* rootSaga() {
  yield all([
    rootPkgSaga(),
    rootBusPathSaga(),
    rootPrintBusPathSaga(),
    rootDashboardSaga()
  ])
}
