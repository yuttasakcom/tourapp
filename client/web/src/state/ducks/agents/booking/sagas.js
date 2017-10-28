import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import actions from '../../actions'
import socket from '../../../utils/socket'
import { openAgentReport } from '../../../utils'
import { FETCH_PKGS, FETCH_HOTELS, ADD_BOOKING } from './types'

export function* watchFetchPkgs() {
  yield takeEvery(FETCH_PKGS, function*() {
    try {
      const { data } = yield call(axios.get, '/pkgs')
      yield put(actions.agent.booking.fetchPkgsSuccess(data))
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

export function* watchFetchHotels() {
  yield takeEvery(FETCH_HOTELS, function*() {
    try {
      const { data } = yield call(axios.get, '/hotels')
      yield put(actions.agent.booking.fetchHotelsSuccess(data))
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

export function* watchAddBooking() {
  yield takeEvery(ADD_BOOKING, function*(action) {
    try {
      const { data } = yield call(axios.post, '/bookings', action.payload)
      yield call(openAgentReport, `voucher?bookingId=${data._id}`)
      yield put(actions.agent.booking.addBookingSuccess(data))
      yield put(
        success({
          title: 'แจ้งเตือน',
          message: 'จองแพ็คเกจสำเร็จแล้ว!'
        })
      )
      socket.emit('book', data)
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
  yield all([watchFetchPkgs(), watchFetchHotels(), watchAddBooking()])
}
