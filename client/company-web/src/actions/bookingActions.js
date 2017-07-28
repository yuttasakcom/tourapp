import axios from './axios'
import socket from './socket'

import { waiting, readed, accepted, rejected, completed } from './bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  SET_BOOKINGS_DATE_VISIBILITY_FILTER,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL,
  ACCEPT_BOOKING_SUCCESS,
  REJECT_BOOKING_SUCCESS,
  COMPLETE_BOOKING_SUCCESS
} from './types'

const updateBookingStatus = async (_id, status) => {
  const { data } = await axios.put(`/bookings/${_id}`, { status })
  data.updatedStatus = status
  socket.emit('bookingStatusUpdate', data)
}

export const fetchBookings = date => async dispatch => {
  let query = ''
  if (date) {
    query = `?date=${date}`
  }
  try {
    const { data } = await axios.get(`/bookings${query}`)
    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const setBookingsStatusVisibilityFilter = status => {
  return {
    type: SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
    payload: status
  }
}

export const setBookingsDateVisibilityFilter = date => async dispatch => {
  try {
    const { data } = await axios.get(`/bookings?date=${date}`)
    dispatch({
      type: SET_BOOKINGS_DATE_VISIBILITY_FILTER,
      payload: { date, data }
    })
  } catch (e) {
    console.error(e)
  }
}

export const openManageBookingModal = (_id, status) => async dispatch => {
  if (status === waiting) {
    status = readed
    try {
      await updateBookingStatus(_id, status)
    } catch (e) {
      console.error(e)
    }
  }
  dispatch({
    type: OPEN_MANAGE_BOOKING_MODAL,
    payload: _id
  })
}

export const acceptBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, accepted)
    dispatch({ type: ACCEPT_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const rejectBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, rejected)
    dispatch({ type: REJECT_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const completeBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, completed)
    dispatch({ type: COMPLETE_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const closeManageBookingModal = () => {
  return {
    type: CLOSE_MANAGE_BOOKING_MODAL
  }
}
