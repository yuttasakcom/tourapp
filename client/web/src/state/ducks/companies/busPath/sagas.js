import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

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

export function* watchFetchBusPathHotels() {
  yield takeEvery(FETCH_BUS_PATH_HOTELS, function*(action) {
    const selectedPkg = yield select(state => state.company.busPath.selectedPkg)
    try {
      const { data } = yield call(
        axios.get,
        `/bus-path-hotels/${action.payload}?pkgId=${selectedPkg}`
      )
      yield put(actions.company.busPath.fetchBusPathHotelsSuccess(data))
    } catch (e) {
      yield put(
        error({
          title: 'แจ้งเตือน',
          message: e.message
        })
      )
    }
  })
}

export function* watchAddBusPath() {
  yield takeEvery(ADD_BUS_PATH, function*(action) {
    try {
      const { data } = yield call(axios.post, '/bus-paths', action.payload)
      yield call(actions.company.busPath.addBusPathSuccess(data))
      yield call(
        success({
          title: 'แจ้งเตือน',
          message: 'เพิ่มเส้นทางเรียบร้อยแล้ว!'
        })
      )
    } catch (e) {
      yield put(
        error({
          title: 'แจ้งเตือน',
          message: e.response.data.error
        })
      )
    }
  })
}

export default function* rootSaga() {
  yield all([watchFetchBusPaths(), watchAddBusPath()])
}
