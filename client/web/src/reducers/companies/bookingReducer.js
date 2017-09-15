import mapKeys from 'lodash/mapKeys'
import moment from 'moment'

import {
  waiting,
  readed,
  accepted,
  rejected,
  completed
} from '../../actions/bookingStatus'
import {
  COMPANY_FETCH_BOOKINGS_SUCCESS,
  COMPANY_SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  COMPANY_OPEN_MANAGE_BOOKING_MODAL,
  COMPANY_CLOSE_MANAGE_BOOKING_MODAL,
  COMPANY_ACCEPT_BOOKING_SUCCESS,
  COMPANY_REJECT_BOOKING_SUCCESS,
  COMPANY_COMPLETE_BOOKING_SUCCESS
} from '../../actions/companies/types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false,
  visibilityFilter: { date: moment().startOf('day'), status: waiting }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_SET_BOOKINGS_STATUS_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: { ...state.visibilityFilter, status: action.payload }
      }

    case COMPANY_FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: mapKeys(action.payload.data, '_id'),
        visibilityFilter: {
          ...state.visibilityFilter,
          date: action.payload.date
        }
      }

    case COMPANY_OPEN_MANAGE_BOOKING_MODAL:
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

    case COMPANY_ACCEPT_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [action.payload]: {
            ...state.bookings[action.payload],
            status: accepted
          }
        },
        showManageBookingModal: false
      }

    case COMPANY_REJECT_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [action.payload]: {
            ...state.bookings[action.payload],
            status: rejected
          }
        },
        showManageBookingModal: false
      }

    case COMPANY_COMPLETE_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [action.payload]: {
            ...state.bookings[action.payload],
            status: completed
          }
        },
        showManageBookingModal: false
      }

    case COMPANY_CLOSE_MANAGE_BOOKING_MODAL:
      return { ...state, showManageBookingModal: false }

    default:
      return state
  }
}
