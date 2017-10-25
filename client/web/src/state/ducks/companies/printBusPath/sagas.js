import map from 'lodash/map'
import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { openCompanyReport } from '../../../utils'
import { PRINT_BUS_PATHS, UPDATE_BUS_PATHS } from './types'

export function* watchPrintBusPaths() {
  yield takeEvery(PRINT_BUS_PATHS, function*() {
    const { date, pkg } = yield select(
      state => state.company.printBusPath.visibilityFilter
    )
    openCompanyReport(`bus-paths-summary/${date}?pkgId=${pkg.value}`)
  })
}

export function* watchUpdateBusPaths() {
  yield takeEvery(UPDATE_BUS_PATHS, function*() {
    const hotelsSelects = yield select(
      state => state.company.printBusPath.hotelsSelects
    )
    const busPathsProps = map(hotelsSelects, hotelsSelect => ({
      busPathId: hotelsSelect.busPathId,
      hotelIds: map(hotelsSelect.values, 'value'),
      removedHotelIds: hotelsSelect.removedHotelIds
    }))
    yield call(axios.put, '/bus-paths', busPathsProps)
    yield put(
      success({
        title: 'แจ้งเตือน',
        message: 'อัพเดทสายรถเรียบร้อยแล้ว!'
      })
    )
  })
}

export default function* rootSaga() {
  yield all([watchPrintBusPaths()])
}
