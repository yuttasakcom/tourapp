import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_ACCEPT_PENDINGS, FETCH_NOTIFICATIONS } from './types'

export function* watchFetchAcceptPendings() {
  yield takeEvery(FETCH_ACCEPT_PENDINGS, function*() {
    try {
      const { data } = yield call(axios.get, '/accept-pendings')
      yield put(
        actions.company.notification.fetchAcceptPendingsSuccess(
          data.acceptPendings
        )
      )
    } catch (e) {
      yield put(
        error({
          title: 'แจ้งเตือน',
          message: e.response.data
        })
      )
    }
  })
}

export function* watchFetchNotifications() {
  yield takeEvery(FETCH_NOTIFICATIONS, function*() {
    yield put(actions.company.notification.fetchNotificationsSuccess([]))
  })
}

export default function* rootSaga() {
  yield all([watchFetchAcceptPendings()])
}
