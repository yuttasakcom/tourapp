import mapKeys from 'lodash/mapKeys'
import intersectionBy from 'lodash/intersectionBy'
import map from 'lodash/map'

export default (state, action) => {
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
}
