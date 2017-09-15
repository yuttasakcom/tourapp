import moment from 'moment'

import { COMPANY_FETCH_BOOKINGS_SUMMARY_SUCCESS } from '../../actions/companies/types'

const initialState = {
  bookingsSummary: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FETCH_BOOKINGS_SUMMARY_SUCCESS:
      return {
        ...state,
        bookingsSummary: action.payload.data,
        visibilityFilter: { date: action.payload.date }
      }

    default:
      return state
  }
}
