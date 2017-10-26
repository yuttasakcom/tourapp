import moment from 'moment'
import { handleActions } from 'redux-actions'

import { FETCH_BOOKINGS_SUMMARY_SUCCESS } from './types'

const initialState = {
  bookingsSummary: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default handleActions(
  {
    [FETCH_BOOKINGS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      bookingsSummary: action.payload.data,
      visibilityFilter: { date: action.payload.date }
    })
  },
  initialState
)
