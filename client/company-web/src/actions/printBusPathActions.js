import moment from 'moment'

import axios from './axios'
import { FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS, MANAGE_BUS_PATH } from './types'

export const fetchBookingsHotelsSummary = date => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const { data } = await axios.get(
      `/bookings-hotels-summary?dateStart=${date}&dateEnd=${dateEnd}`
    )
    dispatch({
      type: FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS,
      payload: { date, data }
    })
  } catch (e) {
    console.error(e)
  }
}

export const manageBusPath = (values, index) => ({
  type: MANAGE_BUS_PATH,
  payload: { values, index }
})
