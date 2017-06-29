import _ from 'lodash'

import { FETCH_BOOKINGS_SUCCESS } from '../actions/types'

const initialState = {
  bookings: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, bookings: _.mapKeys(action.payload, '_id') }

    default:
      return state
  }
}
