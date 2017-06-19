import axios from './axios'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_BOOKING_MODAL,
  CLOSE_ADD_BOOKING_MODAL
} from './types'

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/pkgs')
    dispatch({ type: FETCH_PKGS_SUCCESS, payload: data })
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
