import axios from './axios'
import { FETCH_BOOKINGS_SUCCESS, SET_BOOKINGS_VISIBILITY_FILTER } from './types'

export const fetchBookings = () => async dispatch => {
  try {
    const { data } = await axios.get('/bookings')
    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const setBookingsVisibilityFilter = filter => {
  return {
    type: SET_BOOKINGS_VISIBILITY_FILTER,
    payload: filter
  }
}
