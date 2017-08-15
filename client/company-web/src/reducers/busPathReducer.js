import moment from 'moment'
import mapKeys from 'lodash/mapKeys'
import times from 'lodash/times'
import omit from 'lodash/omit'
import map from 'lodash/map'
import difference from 'lodash/difference'
import pick from 'lodash/pick'
import merge from 'lodash/merge'

import {
  FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS,
  ADD_BUS_PATH
} from '../actions/types'

const initialState = {
  hotels: {},
  hotelsSelects: [],
  visibilityFilter: { date: moment().startOf('day') }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_HOTELS_SUMMARY_SUCCESS:
      const options = mapKeys(action.payload.data, '_id')
      const hotelsSelects = []
      times(8, index => {
        hotelsSelects[index] = { options, values: null }
      })
      return {
        ...state,
        hotels: action.payload.data,
        hotelsSelects,
        visibilityFilter: { date: action.payload.date }
      }

    case ADD_BUS_PATH:
      const { values, index } = action.payload
      const addMode = state.hotelsSelects[index].values
        ? state.hotelsSelects[index].values.length < values.length
        : true
      if (addMode) {
        return {
          ...state,
          hotelsSelects: map(state.hotelsSelects, (hotelsSelect, i) => ({
            options:
              Number(i) === index
                ? hotelsSelect.options
                : omit(hotelsSelect.options, values[values.length - 1].value),
            values: Number(i) === index ? values : hotelsSelect.values
          }))
        }
      } else {
        const removedItemsId = map(
          difference(state.hotelsSelects[index].values, values),
          'value'
        )
        const removedItemsOptions = pick(
          state.hotelsSelects[index].options,
          removedItemsId
        )
        return {
          ...state,
          hotelsSelects: map(state.hotelsSelects, (hotelsSelect, i) => ({
            options:
              Number(i) === index
                ? hotelsSelect.options
                : merge(hotelsSelect.options, removedItemsOptions),
            values: Number(i) === index ? values : hotelsSelect.values
          }))
        }
      }

    default:
      return state
  }
}
