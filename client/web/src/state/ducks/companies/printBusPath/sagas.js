import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { openCompanyReport } from '../../../utils'
import { PRINT_BUS_PATHS } from './types'

export function* watchPrintBusPaths() {
  yield takeEvery(PRINT_BUS_PATHS, function*() {
    const { date, pkg } = yield select(
      state => state.company.printBusPath.visibilityFilter
    )
    openCompanyReport(`bus-paths-summary/${date}?pkgId=${pkg.value}`)
  })
}

export default function* rootSaga() {
  yield all([watchPrintBusPaths()])
}
