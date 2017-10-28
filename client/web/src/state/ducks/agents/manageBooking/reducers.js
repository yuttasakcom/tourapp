import { handleActions } from 'redux-actions'
import moment from 'moment'
import mapKeys from 'lodash/mapKeys'

import { waiting } from '../../../utils/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SELECT_BOOKING,
  SET_BOOKINGS_STATUS_VISIBILITY_FILTER,
  SET_BOOKINGS_DATE_VISIBILITY_FILTER
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

    [FETCH_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: mapKeys(action.payload, '_id')
    }),

    [SELECT_BOOKING]: (state, action) => ({
      ...state,
      selectedBooking: action.payload
    })
  },
  initialState
)
