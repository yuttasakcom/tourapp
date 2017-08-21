import moment from 'moment'
import { success } from 'react-notification-system-redux'
import map from 'lodash/map'

import axios from './axios'
import { openReport } from '../helpers'
import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
  MANAGE_BUS_PATH
} from './types'

export const printBusPaths = () => (dispatch, getState) => {
  const { date } = getState().printBusPath.visibilityFilter
  openReport(`bus-paths-summary/${date}`)
}

export const updateBusPaths = () => async (dispatch, getState) => {
  const { hotelsSelects } = getState().printBusPath
  const busPathsProps = map(hotelsSelects, hotelsSelect => ({
    busPathId: hotelsSelect.busPathId,
    hotelIds: map(hotelsSelect.values, 'value'),
    removedHotelIds: hotelsSelect.removedHotelIds
  }))
  await axios.put('/bus-paths', busPathsProps)
  dispatch(
    success({
      title: 'แจ้งเตือน',
      message: 'อัพเดทสายรถเรียบร้อยแล้ว!'
    })
  )
}

export const fetchBookingsHotelsSummaryAndBusPaths = (
  date,
  pkg
) => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const [busPaths, bookingsHotelsSummary] = await Promise.all([
      axios.get(`/bus-paths?pkgId=${pkg.value}`),
      axios.get(
        `/bookings-hotels-summary?dateStart=${date}&dateEnd=${dateEnd}&pkgId=${pkg.value}`
      )
    ])
    dispatch({
      type: FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
      payload: {
        pkg,
        date,
        busPaths: busPaths.data,
        bookingsHotelsSummary: bookingsHotelsSummary.data
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export const manageBusPath = (values, index) => ({
  type: MANAGE_BUS_PATH,
  payload: { values, index }
})
