import mapKeys from 'lodash/mapKeys'
import moment from 'moment'
import { handleActions } from 'redux-actions'

import {
  waiting,
  readed,
  accepted,
  rejected,
  completed
} from '../../../utils/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  OPEN_MANAGE_BOOKING_MODAL,
  CLOSE_MANAGE_BOOKING_MODAL,
  ACCEPT_BOOKING_SUCCESS,
  REJECT_BOOKING_SUCCESS,
  COMPLETE_BOOKING_SUCCESS
} from './types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  showManageBookingModal: false,
  visibilityFilter: { date: moment().startOf('day'), status: waiting }
}

export default handleActions(
  {
    [SET_BOOKINGS_STATUS_VISIBILITY_FILTER]: (state, action) => ({
      ...state,
      visibilityFilter: { ...state.visibilityFilter, status: action.payload }
    }),

    [FETCH_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: mapKeys(action.payload.data, '_id'),
      visibilityFilter: {
        ...state.visibilityFilter,
        date: action.payload.date
      }
    }),

    [OPEN_MANAGE_BOOKING_MODAL]: (state, action) => {
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
    },

    [ACCEPT_BOOKING_SUCCESS]: (state, action) => ({
      ...state,
      bookings: {
        ...state.bookings,
        [action.payload]: {
          ...state.bookings[action.payload],
          status: accepted
        }
      },
      showManageBookingModal: false
    }),

    [REJECT_BOOKING_SUCCESS]: (state, action) => ({
      ...state,
      bookings: {
        ...state.bookings,
        [action.payload]: {
          ...state.bookings[action.payload],
          status: rejected
        }
      },
      showManageBookingModal: false
    }),

    [COMPLETE_BOOKING_SUCCESS]: (state, action) => ({
      ...state,
      bookings: {
        ...state.bookings,
        [action.payload]: {
          ...state.bookings[action.payload],
          status: completed
        }
      },
      showManageBookingModal: false
    }),

    [CLOSE_MANAGE_BOOKING_MODAL]: (state, action) => ({
      ...state,
      showManageBookingModal: false
    })
  },
  initialState
)
