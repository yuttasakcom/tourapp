import moment from 'moment'

import initialBusPaths from './initialBusPaths'
import manageBusPath from './manageBusPath'
import {
  COMPANY_FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
  COMPANY_MANAGE_BUS_PATH
} from '../../../actions/companies/types'

const initialState = {
  bookingsHotelsSummary: {},
  hotelsSelects: [],
  visibilityFilter: { date: moment().startOf('day'), pkg: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS:
      return initialBusPaths(state, action)

    case COMPANY_MANAGE_BUS_PATH:
      return manageBusPath(state, action)

    default:
      return state
  }
}
