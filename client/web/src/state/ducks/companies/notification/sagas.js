import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import socket from '../../../utils/socket'
import {
  FETCH_ACCEPT_PENDINGS,
  FETCH_NOTIFICATIONS,
  ADD_NOTIFICATION,
  FETCH_REQUEST_PENDINGS,
  ACCEPT_AGENT
} from './types'

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

export function* watchFetchRequestPendings() {
  yield takeEvery(FETCH_REQUEST_PENDINGS, function*() {
    try {
      const { data } = yield call(axios.get, '/request-pendings')
      yield put(
        actions.company.notification.fetchRequestPendingsSuccess(
          data.requestPendings
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

export function* watchAddNotification() {
  yield takeEvery(ADD_NOTIFICATION, function*(action) {
    yield put(
      actions.company.notification.addNotificationSuccess(action.payload)
    )
  })
}

export function* watchAcceptAgent() {
  yield takeEvery(ACCEPT_AGENT, function*(action) {
    const id = action.payload
    try {
      yield call(axios.post, '/accept', { _id: id })
      yield put(actions.company.notification.acceptAgentSuccess(id))
      socket.emit('accept', { _id: id })
      yield put(actions.company.agent.fetchAgents())
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

export default function* rootSaga() {
  yield all([
    watchFetchAcceptPendings(),
    watchFetchRequestPendings(),
    watchFetchNotifications(),
    watchAddNotification(),
    watchAcceptAgent()
  ])
}
