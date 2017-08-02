import { mapKeys } from 'lodash'
import moment from 'moment'

import { waiting } from '../actions/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER
} from '../actions/types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false,
  visibilityFilter: { date: moment().startOf('day'), status: waiting }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS_STATUS_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: { ...state.visibilityFilter, status: action.payload }
      }

    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: mapKeys(action.payload.data, '_id'),
        visibilityFilter: {
          ...state.visibilityFilter,
          date: action.payload.date
        }
      }

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
