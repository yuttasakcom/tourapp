import mapKeys from 'lodash/mapKeys'
import moment from 'moment'
import { handleActions } from 'redux-actions'

import { waiting } from '../../../utils/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  SET_BOOKINGS_DATE_VISIBILITY_FILTER,
  SELECT_BOOKING,
  UPDATE_BOOKING_STATUS_SUCCESS
} from './types'

const initialState = {
  bookings: {},
  selectedBooking: null,
  visibilityFilter: { date: moment().startOf('day'), status: waiting }
}

export default handleActions(
  {
    [SET_BOOKINGS_STATUS_VISIBILITY_FILTER]: (state, action) => ({
      ...state,
      visibilityFilter: { ...state.visibilityFilter, status: action.payload }
    }),

    [SET_BOOKINGS_DATE_VISIBILITY_FILTER]: (state, action) => ({
      ...state,
      visibilityFilter: { ...state.visibilityFilter, date: action.payload }
    }),

    [SELECT_BOOKING]: (state, action) => ({
      ...state,
      selectedBooking: action.payload
    }),

    [FETCH_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: mapKeys(action.payload, '_id')
    }),

    [UPDATE_BOOKING_STATUS_SUCCESS]: (state, { payload: { id, status } }) => ({
      ...state,
      bookings: {
        ...state.bookings,
        [id]: {
          ...state.bookings[id],
          status
        }
      }
    })
  },
  initialState
)
