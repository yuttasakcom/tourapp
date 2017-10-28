import moment from 'moment'
import { error } from 'react-notification-system-redux'
import { takeEvery, put, all, call, select } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import actions from '../../actions'
import { FETCH_BOOKINGS } from './types'

export function* watchFetchBookings() {
  yield takeEvery(FETCH_BOOKINGS, function*() {
    const date = yield select(
      state => state.agent.manageBooking.visibilityFilter.date
    )
    const dateEnd = moment(date.clone()).add(1, 'days')
    try {
      const { data } = yield call(
        axios.get,
        `/bookings?dateStart=${date}&dateEnd=${dateEnd}`
      )
      yield put(actions.agent.manageBooking.fetchBookingsSuccess(data))
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
  yield all([watchFetchBookings()])
}
