import moment from 'moment'
import mapKeys from 'lodash/mapKeys'
import intersectionBy from 'lodash/intersectionBy'
import map from 'lodash/map'

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
      const { bookingsHotelsSummary, busPaths, date } = action.payload
      const options = mapKeys(bookingsHotelsSummary, '_id')
      const myvalues = [...bookingsHotelsSummary, busPaths]
      console.log(myvalues)
      const hotelsSelects = []
      map(busPaths, (busPath, index) => {
        hotelsSelects.push({
          options,
          values: null,
          busPathId: busPath._id,
          busPathName: busPath.name
        })
      })
      return {
        ...state,
        bookingsHotelsSummary,
        hotelsSelects,
        visibilityFilter: { date }
      }

    case MANAGE_BUS_PATH:
      return manageBusPath(state, action)

    default:
      return state
  }
}
