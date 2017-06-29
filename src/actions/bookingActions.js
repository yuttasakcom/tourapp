import axios from './axios'

import { waiting, readed } from './bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_VISIBILITY_FILTER,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL
} from './types'

const updateBookingStatus = (_id, status) =>
  axios.put(`/bookings/${_id}`, { status })

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

export const openManageBookingModal = (_id, status) => async dispatch => {
  if (status === waiting) {
    status = readed
    await updateBookingStatus(_id, status)
  }
  dispatch({
    type: OPEN_MANAGE_BOOKING_MODAL,
    payload: { _id, status }
  })
}

export const closeManageBookingModal = () => {
  return {
    type: CLOSE_MANAGE_BOOKING_MODAL
  }
}
