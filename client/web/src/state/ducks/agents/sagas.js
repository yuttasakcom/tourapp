import { all } from 'redux-saga/effects'

import rootDashboardSaga from './dashboard/sagas'
import rootBookingSaga from './booking/sagas'
import rootEmployeeSaga from './employee/sagas'
import rootManageBookingSaga from './manageBooking/sagas'

export default function* rootSaga() {
  yield all([
    rootDashboardSaga(),
    rootBookingSaga(),
    rootEmployeeSaga(),
    rootManageBookingSaga()
  ])
}
