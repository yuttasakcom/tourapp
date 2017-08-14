import mapKeys from 'lodash/mapKeys'
import moment from 'moment'

import { FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS } from '../actions/types'

const initialState = {
  hotels: {},
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS:
      return {
        ...state,
        hotels: mapKeys(action.payload.data, '_id'),
        visibilityFilter: { date: action.payload.date }
      }

    default:
      return state
  }
}
