import mapKeys from 'lodash/mapKeys'
import moment from 'moment'

import { waiting } from '../../actions/bookingStatus'
import {
  AGENT_FETCH_BOOKINGS_SUCCESS,
  AGENT_OPEN_MANAGE_BOOKING_MODAL,
  AGENT_CLOSE_MANAGE_BOOKING_MODAL,
  AGENT_SET_BOOKINGS_STATUS_VISIBILITY_FILTER
} from '../../actions/agents/types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false,
  visibilityFilter: { date: moment().startOf('day'), status: waiting }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_SET_BOOKINGS_STATUS_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: { ...state.visibilityFilter, status: action.payload }
      }

    case AGENT_FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: mapKeys(action.payload.data, '_id'),
        visibilityFilter: {
          ...state.visibilityFilter,
          date: action.payload.date
        }
      }

    case AGENT_OPEN_MANAGE_BOOKING_MODAL:
      return {
        ...state,
        showManageBookingModal: true,
        selectedBooking: action.payload
      }

    case AGENT_CLOSE_MANAGE_BOOKING_MODAL:
      return {
        ...state,
        showManageBookingModal: false
      }

    default:
      return state
  }
}
