import moment from 'moment'

import { FETCH_BOOKINGS_DASHBOARD_SUCCESS } from '../actions/types'

const dateNowStart = moment().startOf('day')
const dateNowEnd = dateNowStart.clone().endOf('day')

const initialState = {
  bookings: [],
  visibilityFilter: { dateStart: dateNowStart, dateNowEnd: dateNowEnd }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_DASHBOARD_SUCCESS:
      return {
        ...state,
        bookings: action.payload.data,
        visibilityFilter: {
          dateStart: action.payload.dateStart,
          dateEnd: action.payload.dateEnd
        }
      }

    default:
      return state
  }
}
