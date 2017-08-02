import axios from './axios'

import {
  FETCH_BOOKINGS_SUCCESS,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER
} from './types'

export const setBookingsStatusVisibilityFilter = status => {
  return {
    type: SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
    payload: status
  }
}

export const fetchBookings = date => async dispatch => {
  try {
    const { data } = await axios.get(`/bookings?date=${date}`)
    dispatch({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: { date, data }
    })
  } catch (e) {
    console.error(e)
  }
}

export const openManageBookingModal = _id => {
  return {
    type: OPEN_MANAGE_BOOKING_MODAL,
    payload: _id
  }
}

export const closeManageBookingModal = () => {
  return { type: CLOSE_MANAGE_BOOKING_MODAL }
}
