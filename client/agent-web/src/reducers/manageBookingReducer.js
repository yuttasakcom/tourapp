import _ from 'lodash'

import { waiting } from '../actions/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL,
  SET_BOOKINGS_VISIBILITY_FILTER
} from '../actions/types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false,
  visibilityFilter: waiting
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, bookings: _.mapKeys(action.payload, '_id') }

    case SET_BOOKINGS_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.payload }

    case OPEN_MANAGE_BOOKING_MODAL:
      return {
        ...state,
        showManageBookingModal: true,
        selectedBooking: action.payload
      }

    case CLOSE_MANAGE_BOOKING_MODAL:
      return {
        ...state,
        showManageBookingModal: false
      }

    default:
      return state
  }
}
