import moment from 'moment'
import { success } from 'react-notification-system-redux'
import map from 'lodash/map'

import axios from './axios'
import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
  MANAGE_BUS_PATH
} from './types'

export const updateBusPaths = hotelsSelects => async (dispatch, getState) => {
  const { hotelsSelects } = getState().printBusPath
  const busPathsProps = map(hotelsSelects, hotelsSelect => ({
    busPathId: hotelsSelect.busPathId,
    hotelIds: map(hotelsSelect.values, 'value')
  }))
  await axios.put('/bus-paths', busPathsProps)
  dispatch(
    success({
      title: 'แจ้งเตือน',
      message: 'อัพเดทสายรถเรียบร้อยแล้ว!'
    })
  )
}

export const fetchBookingsHotelsSummaryAndBusPaths = date => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const [busPaths, bookingsHotelsSummary] = await Promise.all([
      axios.get('/bus-paths'),
      axios.get(`/bookings-hotels-summary?dateStart=${date}&dateEnd=${dateEnd}`)
    ])
    dispatch({
      type: FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
      payload: {
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
