import mapKeys from 'lodash/mapKeys'
import times from 'lodash/times'
import moment from 'moment'

import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS,
  ADD_BUS_PATH
} from '../actions/types'

const initialState = {
  hotelsSelects: {
    options: {},
    values: {}
  },
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS:
      const options = mapKeys(action.payload.data, '_id')
      const hotelsSelects = {}
      times(8, index => {
        hotelsSelects[index] = { options, values: null }
      })
      return {
        ...state,
        hotelsSelects,
        visibilityFilter: { date: action.payload.date }
      }

    case ADD_BUS_PATH:
      return {
        ...state,
        hotelsSelects: {
          ...state.hotelsSelects,
          [action.payload.index]: {
            options: state.hotelsSelects[action.payload.index].options,
            values: action.payload.value
          }
        }
      }

    default:
      return state
  }
}
