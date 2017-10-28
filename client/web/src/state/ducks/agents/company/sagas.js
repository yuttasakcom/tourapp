import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import actions from '../../actions'
import { FETCH_COMPANIES } from './types'

export function* watchFetchCompanies() {
  yield takeEvery(FETCH_COMPANIES, function*() {
    try {
      const { data } = yield call(axios.get, '/companies')
      yield put(actions.agent.company.fetchCompaniesSuccess(data))
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
  yield all([watchFetchCompanies()])
}
