import delay from 'lodash/delay'

import axios from './axios'
import socket from './socket'
import { openReport } from '../helpers'
import {
  FETCH_PKGS_SUCCESS,
  FETCH_HOTELS_SUCCESS,
  OPEN_ADD_BOOKING_MODAL,
  CLOSE_ADD_BOOKING_MODAL,
  ADD_BOOKING_SUCCESS,
  HIDE_BOOKING_NOTIFICATION
} from './types'

export const fetchHotels = () => async dispatch => {
  try {
    const { data } = await axios.get('/hotels')
    dispatch({ type: FETCH_HOTELS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/pkgs')
    dispatch({ type: FETCH_PKGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addBooking = bookingProps => async dispatch => {
  try {
    const { data } = await axios.post('/bookings', bookingProps)
    openReport(`voucher?bookingId=${data._id}`)
    dispatch({ type: ADD_BOOKING_SUCCESS, payload: data })
    socket.emit('book', data)
    delay(() => dispatch({ type: HIDE_BOOKING_NOTIFICATION }), 4000)
  } catch (e) {
    console.error(e)
  }
}

export const openAddBookingModal = _id => {
  return { type: OPEN_ADD_BOOKING_MODAL, payload: _id }
}

export const closeAddBookingModal = () => {
  return { type: CLOSE_ADD_BOOKING_MODAL }
}
