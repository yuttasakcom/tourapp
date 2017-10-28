import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

import axios from '../../../utils/axiosAgents'
import socket from '../../../utils/socket'
import actions from '../../actions'
import { FETCH_COMPANIES, DELETE_COMPANY } from './types'

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

export function* watchDeleteCompany() {
  yield takeEvery(DELETE_COMPANY, function*() {
    const { selectedCompany } = yield select(state => state.agent.company)
    try {
      const { data: { message } } = yield call(
        axios.delete,
        `/relationship/${selectedCompany}`
      )
      yield put(actions.agent.company.deleteCompanySuccess(selectedCompany))
      socket.emit('deleteRelationship', { _id: selectedCompany })
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
          message: e.response.data
        })
      )
    }
  })
}
export default function* rootSaga() {
  yield all([watchFetchCompanies(), watchDeleteCompany()])
}
