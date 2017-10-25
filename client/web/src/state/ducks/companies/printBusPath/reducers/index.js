import moment from 'moment'
import { handleActions } from 'redux-actions'

import initialBusPaths from './initialBusPaths'
import manageBusPath from './manageBusPath'
import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS,
  MANAGE_BUS_PATH
} from '../types'

const initialState = {
  bookingsHotelsSummary: {},
  hotelsSelects: [],
  visibilityFilter: { date: moment().startOf('day'), pkg: null }
}

export default handleActions(
  {
    [FETCH_BOOKINGS_HOTELS_SUMMARY_AND_BUS_PATHS_SUCCESS]: initialBusPaths,
    [MANAGE_BUS_PATH]: manageBusPath
  },
  initialState
)
