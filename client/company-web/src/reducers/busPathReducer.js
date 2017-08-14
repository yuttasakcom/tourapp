import mapKeys from 'lodash/mapKeys'

import { FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS } from '../actions/types'

const initialState = {
  hotels: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS:
      return {
        ...state,
        hotels: mapKeys(action.payload.data, '_id')
      }

    default:
      return state
  }
}
