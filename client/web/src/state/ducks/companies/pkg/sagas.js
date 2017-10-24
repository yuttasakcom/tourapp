import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { FETCH_PKGS, ADD_PKG, EDIT_PKG } from './types'

export function* watchFetchPkgs() {
  yield takeEvery(FETCH_PKGS, function*() {
    try {
      const { data } = yield call(axios.get, '/pkgs')
      yield put(actions.company.pkg.fetchPkgsSuccess(data))
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

export function* watchAddPkg() {
  yield takeEvery(ADD_PKG, function*(action) {
    try {
      const { data } = yield call(axios.post, '/pkgs', action.payload)
      yield put(actions.company.pkg.addPkgSuccess(data))
      yield put(
        success({
          title: 'แจ้งเตือน',
          message: 'เพิ่มแพ็คเกจเรียบร้อยแล้ว!'
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

export function* watchEditPkg() {
  yield takeEvery(EDIT_PKG, function*(action) {
    const { id, values } = action.payload
    try {
      const { data } = yield call(axios.put, `/pkgs/${id}`, values)
      yield put(actions.company.pkg.editPkgSuccess(data))
      yield put(
        success({
          title: 'แจ้งเตือน',
          message: 'แก้ไขแพ็คเกจเรียบร้อยแล้ว!'
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
  yield all([watchFetchPkgs(), watchAddPkg(), watchEditPkg()])
}
