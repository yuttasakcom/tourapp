import moment from 'moment'

import axios from './axios'
import { FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS } from './types'

export const fetchBookingsHotelsSummary = date => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const { data } = await axios.get(
      `/bookingsHotelsSummary?dateStart=${date}&dateEnd=${dateEnd}`
    )
    dispatch({
      type: FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS,
      payload: { date, data }
    })
  } catch (e) {
    console.error(e)
  }
}
