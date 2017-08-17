import mapKeys from 'lodash/mapKeys'
import intersectionBy from 'lodash/intersectionBy'
import map from 'lodash/map'

export default (state, action) => {
  const { bookingsHotelsSummary, busPaths, date } = action.payload
  const options = mapKeys(bookingsHotelsSummary, '_id')
  const hotelsSelects = map(busPaths, (busPath, index) => ({
    options,
    values: map(
      intersectionBy(busPath.hotels, bookingsHotelsSummary, '_id'),
      hotel => ({ value: hotel._id, label: hotel.name })
    ),
    busPathId: busPath._id,
    busPathName: busPath.name
  }))
  return {
    ...state,
    bookingsHotelsSummary,
    hotelsSelects,
    visibilityFilter: { date }
  }
}
