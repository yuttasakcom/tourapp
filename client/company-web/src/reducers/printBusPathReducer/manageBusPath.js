import omit from 'lodash/omit'
import map from 'lodash/map'
import difference from 'lodash/difference'
import pick from 'lodash/pick'
import merge from 'lodash/merge'

export default (state, action) => {
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
        values: Number(i) === index ? values : hotelsSelect.values,
        busPathId: hotelsSelect.busPathId,
        busPathName: hotelsSelect.busPathName
      }))
    }
  } else {
    const removedItemIds = map(
      difference(state.hotelsSelects[index].values, values),
      'value'
    )
    const removedItemsOptions = pick(
      state.hotelsSelects[index].options,
      removedItemIds
    )
    return {
      ...state,
      hotelsSelects: map(state.hotelsSelects, (hotelsSelect, i) => ({
        options:
          Number(i) === index
            ? hotelsSelect.options
            : merge(hotelsSelect.options, removedItemsOptions),
        values: Number(i) === index ? values : hotelsSelect.values,
        busPathId: hotelsSelect.busPathId,
        busPathName: hotelsSelect.busPathName
      }))
    }
  }
}
