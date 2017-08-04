import { FETCH_BOOKINGS_DASHBOARD_SUCCESS } from '../actions/types'

const initialState = {
  bookings: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_DASHBOARD_SUCCESS:
      return {
        ...state,
        bookings: action.payload
      }

    default:
      return state
  }
}
