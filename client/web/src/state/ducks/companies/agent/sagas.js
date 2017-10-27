import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import socket from '../../../utils/socket'
import {
  FETCH_AGENTS,
  REQUEST_AGENT,
  FETCH_AGENT_CONTRACT_RATES
} from './types'

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

export function* watchRequestAgent() {
  yield takeEvery(REQUEST_AGENT, function*(action) {
    const id = action.payload
    try {
      const { data: { message } } = yield call(axios.post, '/request', {
        _id: id
      })
      yield put(
        success({
          title: 'แจ้งเตือน',
          message
        })
      )
      socket.emit('request', { _id: id })
      yield put(actions.company.notification.fetchRequestPendings())
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

export function* watchFetchAgentContractRates() {
  yield takeEvery(FETCH_AGENT_CONTRACT_RATES, function*(action) {
    const id = action.payload
    try {
      const { data } = yield call(axios.get, `/special-prices/${id}`)
      yield put(actions.company.agent.fetchAgentContractRatesSuccess(data))
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
  yield all([
    watchFetchAgents(),
    watchRequestAgent(),
    watchFetchAgentContractRates()
  ])
}
