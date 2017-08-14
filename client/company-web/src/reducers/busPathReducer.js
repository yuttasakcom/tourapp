import mapKeys from 'lodash/mapKeys'
import times from 'lodash/times'
import moment from 'moment'

import { FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS } from '../actions/types'

const initialState = {
  hotelsOptions: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS:
      const hotelsOption = mapKeys(action.payload.data, '_id')
      const hotelsOptions = []
      times(8, () => {
        hotelsOptions.push(hotelsOption)
      })
      return {
        ...state,
        hotelsOptions,
        visibilityFilter: { date: action.payload.date }
      }

    default:
      return state
  }
}
