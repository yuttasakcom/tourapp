import moment from 'moment'
import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import socket from '../../../utils/socket'
import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_BOOKINGS, UPDATE_BOOKING_STATUS } from './types'

export function* watchFetchBookings() {
  yield takeEvery(FETCH_BOOKINGS, function*(action) {
    const date = action.payload
    const dateEnd = moment(date.clone()).add(1, 'days')
    try {
      const { data } = yield call(
        axios.get,
        `/bookings?dateStart=${date}&dateEnd=${dateEnd}`
      )
      yield put(actions.company.booking.fetchBookingsSuccess({ date, data }))
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

export function* watchUpdateBookingStatus() {
  yield takeEvery(UPDATE_BOOKING_STATUS, function*(action) {
    const { id, status } = action.payload
    try {
      const { data } = yield call(axios.put, `/bookings/${id}`, { status })
      yield call(socket.emit, 'bookingStatusUpdate', {
        ...data,
        updatedStatus: status
      })
      yield put(
        actions.company.booking.updateBookingStatusSuccess({ id, status })
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

export default function* rootSaga() {
  yield all([watchFetchBookings(), watchUpdateBookingStatus()])
}
