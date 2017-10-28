import moment from 'moment'
import { handleActions } from 'redux-actions'

import {
  FETCH_BOOKING_SUMMARY_SUCCESS,
  SET_BOOKING_SUMMARY_DATE_VISIBILITY_FILTER
} from './types'

const initialState = {
  bookingSummary: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default handleActions(
  {
    [FETCH_BOOKING_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      bookingSummary: action.payload
    }),

    [SET_BOOKING_SUMMARY_DATE_VISIBILITY_FILTER]: (state, action) => ({
      ...state,
      visibilityFilter: { ...state.visibilityFilter, date: action.payload }
    })
  },
  initialState
)
