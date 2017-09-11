import { success } from 'react-notification-system-redux'

import axios from './axios'
import socket from './socket'
import { openAgentReport } from '../../helpers'
import {
  AGENT_FETCH_PKGS_SUCCESS,
  AGENT_FETCH_HOTELS_SUCCESS,
  AGENT_OPEN_ADD_BOOKING_MODAL,
  AGENT_CLOSE_ADD_BOOKING_MODAL,
  AGENT_ADD_BOOKING_SUCCESS
} from './types'

export const fetchHotels = () => async dispatch => {
  try {
    const { data } = await axios.get('/hotels')
    dispatch({ type: AGENT_FETCH_HOTELS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/pkgs')
    dispatch({ type: AGENT_FETCH_PKGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addBooking = bookingProps => async dispatch => {
  try {
    const { data } = await axios.post('/bookings', bookingProps)
    openAgentReport(`voucher?bookingId=${data._id}`)
    dispatch({ type: AGENT_ADD_BOOKING_SUCCESS, payload: data })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: 'จองแพ็คเกจสำเร็จแล้ว!'
      })
    )
    socket.emit('book', data)
  } catch (e) {
    console.error(e)
  }
}

export const openAddBookingModal = _id => {
  return { type: AGENT_OPEN_ADD_BOOKING_MODAL, payload: _id }
}

export const closeAddBookingModal = () => {
  return { type: AGENT_CLOSE_ADD_BOOKING_MODAL }
}
