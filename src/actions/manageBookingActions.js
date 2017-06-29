import axios from './axios'
import { FETCH_BOOKINGS_SUCCESS } from './types'

export const fetchBookings = () => async dispatch => {
  try {
    const { data } = await axios.get('/bookings')
    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}
