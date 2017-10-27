import { error } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import actions from '../../actions'
import { FETCH_PKGS } from './types'

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

export default function* rootSaga() {
  yield all([watchFetchPkgs()])
}
