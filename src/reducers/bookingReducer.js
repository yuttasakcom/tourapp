import _ from 'lodash'

import { waiting, readed } from '../actions/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_VISIBILITY_FILTER,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL
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
      if (state.bookings[action.payload].status === waiting) {
        return {
          ...state,
          bookings: {
            ...state.bookings,
            [action.payload]: {
              ...state.bookings[action.payload],
              status: readed
            }
          },
          showManageBookingModal: true,
          selectedBooking: action.payload
        }
      } else {
        return {
          ...state,
          showManageBookingModal: true,
          selectedBooking: action.payload
        }
      }

    case CLOSE_MANAGE_BOOKING_MODAL:
      return { ...state, showManageBookingModal: false }

    default:
      return state
  }
}
