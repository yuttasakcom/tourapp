import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_DASHBOARD } from './types'

export function* watchFetchDashboard() {
  yield takeEvery(FETCH_DASHBOARD, function*() {
    try {
      const { data } = yield call(axios.get, '/dashboard')
      yield put(actions.company.dashboard.fetchDashboardSuccess(data))
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
  yield all([watchFetchDashboard()])
}
