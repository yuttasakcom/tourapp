import moment from 'moment'

import axios from './axios'
import socket from '../socket'

import {
  waiting,
  readed,
  accepted,
  rejected,
  completed
} from '../bookingStatus'
import {
  COMPANY_FETCH_BOOKINGS_SUCCESS,
  COMPANY_SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  COMPANY_OPEN_MANAGE_BOOKING_MODAL,
  COMPANY_CLOSE_MANAGE_BOOKING_MODAL,
  COMPANY_ACCEPT_BOOKING_SUCCESS,
  COMPANY_REJECT_BOOKING_SUCCESS,
  COMPANY_COMPLETE_BOOKING_SUCCESS
} from './types'

const updateBookingStatus = async (_id, status) => {
  const { data } = await axios.put(`/bookings/${_id}`, { status })
  data.updatedStatus = status
  socket.emit('bookingStatusUpdate', data)
}

export const setBookingsStatusVisibilityFilter = status => {
  return {
    type: COMPANY_SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
    payload: status
  }
}

export const fetchBookings = date => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const { data } = await axios.get(
      `/bookings?dateStart=${date}&dateEnd=${dateEnd}`
    )
    dispatch({
      type: COMPANY_FETCH_BOOKINGS_SUCCESS,
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
    type: COMPANY_OPEN_MANAGE_BOOKING_MODAL,
    payload: _id
  })
}

export const acceptBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, accepted)
    dispatch({ type: COMPANY_ACCEPT_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const rejectBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, rejected)
    dispatch({ type: COMPANY_REJECT_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const completeBooking = _id => async dispatch => {
  try {
    await updateBookingStatus(_id, completed)
    dispatch({ type: COMPANY_COMPLETE_BOOKING_SUCCESS, payload: _id })
  } catch (e) {
    console.error(e)
  }
}

export const closeManageBookingModal = () => {
  return {
    type: COMPANY_CLOSE_MANAGE_BOOKING_MODAL
  }
}
