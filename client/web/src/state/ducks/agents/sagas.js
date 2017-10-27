import { all } from 'redux-saga/effects'

import rootDashboardSaga from './dashboard/sagas'
export default function* rootSaga() {
  yield all([rootDashboardSaga()])
}
