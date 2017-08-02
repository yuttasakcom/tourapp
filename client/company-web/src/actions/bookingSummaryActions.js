import axios from './axios'

import { FETCH_BOOKINGS_SUMMARY_SUCCESS } from './types'

export const fetchBookingsSummary = date => async dispatch => {
  let query = ''
  if (date) {
    query = `?date=${date}`
  }
  try {
    const { data } = await axios.get(`/bookingsSummary${query}`)
    dispatch({ type: FETCH_BOOKINGS_SUMMARY_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}
