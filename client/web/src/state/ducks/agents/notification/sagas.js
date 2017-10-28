import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import actions from '../../actions'
import socket from '../../../utils/socket'
import {
  FETCH_ACCEPT_PENDINGS,
  FETCH_NOTIFICATIONS,
  ADD_NOTIFICATION,
  FETCH_REQUEST_PENDINGS,
  ACCEPT_COMPANY,
  REJECT_REQUEST_COMPANY,
  CANCEL_REQUEST_COMPANY
} from './types'

export function* watchFetchAcceptPendings() {
  yield takeEvery(FETCH_ACCEPT_PENDINGS, function*() {
    try {
      const { data } = yield call(axios.get, '/accept-pendings')
      yield put(
        actions.agent.notification.fetchAcceptPendingsSuccess(
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
        actions.agent.notification.fetchRequestPendingsSuccess(
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
    yield put(actions.agent.notification.fetchNotificationsSuccess([]))
  })
}

export function* watchAddNotification() {
  yield takeEvery(ADD_NOTIFICATION, function*(action) {
    yield put(actions.agent.notification.addNotificationSuccess(action.payload))
  })
}

export function* watchAcceptCompany() {
  yield takeEvery(ACCEPT_COMPANY, function*(action) {
    const id = action.payload
    try {
      yield call(axios.post, '/accept', { _id: id })
      yield put(actions.agent.notification.acceptCompanySuccess(id))
      socket.emit('accept', { _id: id })
      yield put(actions.agent.company.fetchCompanies())
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

export function* watchRejectRequestCompany() {
  yield takeEvery(REJECT_REQUEST_COMPANY, function*(action) {
    const id = action.payload
    try {
      yield call(axios.delete, `/reject-request/${id}`)
      yield put(actions.agent.notification.rejectRequestCompanySuccess(id))
      socket.emit('rejectRequest', { _id: id })
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

export function* watchCancelRequestCompany() {
  yield takeEvery(CANCEL_REQUEST_COMPANY, function*(action) {
    const id = action.payload
    try {
      yield call(axios.delete, `/cancel-request/${id}`)
      yield put(actions.agent.notification.cancelRequestCompanySuccess(id))
      socket.emit('cancelRequest', { _id: id })
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
    watchAcceptCompany(),
    watchRejectRequestCompany(),
    watchCancelRequestCompany()
  ])
}
