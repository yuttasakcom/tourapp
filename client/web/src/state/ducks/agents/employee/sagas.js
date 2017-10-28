import { takeEvery, put, all } from 'redux-saga/effects'

import actions from '../../actions'
import { FETCH_EMPLOYEES } from './types'

export function* watchFetchEmployees() {
  yield takeEvery(FETCH_EMPLOYEES, function*() {
    yield put(
      actions.agent.employee.fetchEmployeesSuccess([
        {
          _id: '1',
          name: 'name',
          phoneNumber: 1234,
          email: 'paiboon@gmail.com',
          password: '1234'
        }
      ])
    )
  })
}

export default function* rootSaga() {
  yield all([watchFetchEmployees()])
}
