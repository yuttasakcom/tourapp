import moment from 'moment'

import axios from './axios'

import {
  AGENT_FETCH_BOOKINGS_SUCCESS,
  AGENT_OPEN_MANAGE_BOOKING_MODAL,
  AGENT_CLOSE_MANAGE_BOOKING_MODAL,
  AGENT_SET_BOOKINGS_STATUS_VISIBILITY_FILTER
} from './types'

export const setBookingsStatusVisibilityFilter = status => {
  return {
    type: AGENT_SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
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
      type: AGENT_FETCH_BOOKINGS_SUCCESS,
      payload: { date, data }
    })
  } catch (e) {
    console.error(e)
  }
}

export const openManageBookingModal = _id => {
  return {
    type: AGENT_OPEN_MANAGE_BOOKING_MODAL,
    payload: _id
  }
}

export const closeManageBookingModal = () => {
  return { type: AGENT_CLOSE_MANAGE_BOOKING_MODAL }
}
