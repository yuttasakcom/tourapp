import moment from 'moment'
import { handleActions } from 'redux-actions'

import { FETCH_BOOKING_SUMMARY_SUCCESS } from './types'

const initialState = {
  bookingSummary: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default handleActions(
  {
    [FETCH_BOOKING_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      bookingSummary: action.payload.data,
      visibilityFilter: { date: action.payload.date }
    })
  },
  initialState
)
