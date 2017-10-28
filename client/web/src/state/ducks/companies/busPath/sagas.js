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
      yield put(actions.company.busPath.addBusPathSuccess(data))
      yield put(
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

export function* watchEditBusPath() {
  yield takeEvery(EDIT_BUS_PATH, function*(action) {
    const { id, values } = action.payload
    try {
      const { data } = yield call(axios.put, `/bus-paths/${id}`, values)
      yield put(actions.company.busPath.editBusPathSuccess(data))
      yield put(
        success({
          title: 'แจ้งเตือน',
          message: 'แก้ไขเส้นทางเรียบร้อยแล้ว!'
        })
      )
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

export function* watchDeleteBusPath() {
  yield takeEvery(DELETE_BUS_PATH, function*(action) {
    const id = action.payload
    try {
      const { data: { message } } = yield call(axios.delete, `/bus-paths/${id}`)
      yield put(actions.company.busPath.deleteBusPathSuccess(id))
      yield put(
        success({
          title: 'แจ้งเตือน',
          message
        })
      )
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

export default function* rootSaga() {
  yield all([
    watchFetchBusPaths(),
    watchFetchBusPathHotels(),
    watchAddBusPath(),
    watchEditBusPath(),
    watchDeleteBusPath()
  ])
}
