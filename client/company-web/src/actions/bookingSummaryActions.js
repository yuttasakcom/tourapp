import axios from './axios'

import { FETCH_BOOKINGS_SUMMARY_SUCCESS } from './types'

export const fetchBookingsSummary = date => async dispatch => {
  try {
    const { data } = await axios.get(`/bookingsSummary?date=${date}`)
    dispatch({ type: FETCH_BOOKINGS_SUMMARY_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}
