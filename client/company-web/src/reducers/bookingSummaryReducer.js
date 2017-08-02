import moment from 'moment'

import { FETCH_BOOKINGS_SUMMARY_SUCCESS } from '../actions/types'

const initialState = {
  bookingsSummary: {},
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUMMARY_SUCCESS:
      return { ...state, bookingsSummary: action.payload }

    default:
      return state
  }
}
