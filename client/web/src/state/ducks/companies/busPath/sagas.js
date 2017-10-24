import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import {
  FETCH_BUS_PATHS,
  FETCH_BUS_PATH_HOTELS,
  ADD_BUS_PATH,
  EDIT_BUS_PATH,
  DELETE_BUS_PATH
} from './types'

export function* watchFetchBusPaths() {
  yield takeEvery(FETCH_BUS_PATHS, function*(action) {
    try {
      const { data } = yield call(
        axios.get,
        `/bus-paths?pkgId=${action.payload}`
      )
      yield put(actions.company.busPath.fetchBusPathsSuccess(data))
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
  yield all([watchFetchBusPaths()])
}
