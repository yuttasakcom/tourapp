import { all } from 'redux-saga/effects'

import rootPkgSaga from './pkg/sagas'
import rootBusPathSaga from './busPath/sagas'
import rootPrintBusPathSaga from './printBusPath/sagas'
import rootDashboardSaga from './dashboard/sagas'
import rootBookingSummarySaga from './bookingSummary/sagas'
import rootBookingSaga from './booking/sagas'
import rootNotificationSaga from './notification/sagas'

export default function* rootSaga() {
  yield all([
    rootPkgSaga(),
    rootBusPathSaga(),
    rootPrintBusPathSaga(),
    rootDashboardSaga(),
    rootBookingSummarySaga(),
    rootBookingSaga(),
    rootNotificationSaga()
  ])
}
