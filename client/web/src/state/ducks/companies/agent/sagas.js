import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_AGENTS } from './types'

export function* watchFetchAgents() {
  yield takeEvery(FETCH_AGENTS, function*() {
    try {
      const { data } = yield call(axios.get, '/agents')
      yield put(actions.company.agent.fetchAgentsSuccess(data))
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
  yield all([watchFetchAgents()])
}
