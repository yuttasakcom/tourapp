import { takeLatest, all, call, put } from 'redux-saga/effects'
import { error } from 'react-notification-system-redux'
import moment from 'moment'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_BOOKING_SUMMARY } from './types'

export function* watchFetchBookingsSummary() {
  yield takeLatest(FETCH_BOOKING_SUMMARY, function*(action) {
    const date = action.payload
    const dateEnd = moment(date.clone()).add(1, 'days')
    try {
      const { data } = yield call(
        axios.get,
        `/bookings-summary?dateStart=${date}&dateEnd=${dateEnd}`
      )
      yield put(
        actions.company.bookingSummary.fetchBookingSummarySuccess({
          data,
          date
        })
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
  yield all([watchFetchBookingsSummary()])
}
