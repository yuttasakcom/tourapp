import _ from 'lodash'

import {
  FETCH_BOOKINGS_SUCCESS,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL
} from '../actions/types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, bookings: _.mapKeys(action.payload, '_id') }

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
