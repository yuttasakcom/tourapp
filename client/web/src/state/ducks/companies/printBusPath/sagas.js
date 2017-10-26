import moment from 'moment'
import map from 'lodash/map'
import { error, success } from 'react-notification-system-redux'
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

import axios from '../../../utils/axiosCompanies'
import actions from '../../actions'
import { openCompanyReport } from '../../../utils'
import {
  PRINT_BUS_PATHS,
  UPDATE_BUS_PATHS,
  FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS
} from './types'

export function* watchPrintBusPaths() {
  yield takeEvery(PRINT_BUS_PATHS, function*() {
    const { date, pkg } = yield select(
      state => state.company.printBusPath.visibilityFilter
    )
    yield call(
      openCompanyReport,
      `bus-paths-summary/${date}?pkgId=${pkg.value}`
    )
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

export function* watchFetchBookingsHotelsSummaryAndBusPaths() {
  yield takeEvery(FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS, function*(
    action
  ) {
    const { date, pkg } = action.payload
    if (!pkg) {
      yield put(
        error({
          title: 'แจ้งเตือน',
          message: 'กรุณาเลือกแพ็คเก็จก่อน'
        })
      )
      return
    }
    const dateEnd = moment(date.clone().add(1, 'days'))
    try {
      const [busPaths, bookingsHotelsSummary] = yield all([
        call(axios.get, `/bus-paths?pkgId=${pkg.value}`),
        call(
          axios.get,
          `/bookings-hotels-summary?dateStart=${date}&dateEnd=${dateEnd}&pkgId=${pkg.value}`
        )
      ])
      yield put(
        actions.company.printBusPath.fetchBookingsHotelsSummaryAndBusPathsSuccess(
          {
            pkg,
            date,
            busPaths: busPaths.data,
            bookingsHotelsSummary: bookingsHotelsSummary.data
          }
        )
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
    watchPrintBusPaths(),
    watchUpdateBusPaths(),
    watchFetchBookingsHotelsSummaryAndBusPaths()
  ])
}
