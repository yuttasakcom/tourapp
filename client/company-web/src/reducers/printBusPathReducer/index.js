import moment from 'moment'

import initialBusPaths from './initialBusPaths'
import manageBusPath from './manageBusPath'
import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
  MANAGE_BUS_PATH
} from '../../actions/types'

const initialState = {
  bookingsHotelsSummary: {},
  hotelsSelects: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS:
      return initialBusPaths(state, action)

    case MANAGE_BUS_PATH:
      return manageBusPath(state, action)

    default:
      return state
  }
}
