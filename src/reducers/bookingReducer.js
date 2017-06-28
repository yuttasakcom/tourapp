import _ from 'lodash'

import { waiting } from '../actions/bookingStatus'
import {
  FETCH_BOOKINGS_SUCCESS,
  SET_BOOKINGS_VISIBILITY_FILTER
} from '../actions/types'

const initialState = {
  bookings: {},
  visibilityFilter: waiting
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, bookings: _.mapKeys(action.payload, '_id') }

    case SET_BOOKINGS_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.payload }

    default:
      return state
  }
}
