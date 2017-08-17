import mapKeys from 'lodash/mapKeys'
import intersectionBy from 'lodash/intersectionBy'
import map from 'lodash/map'
import flatten from 'lodash/flatten'
import omit from 'lodash/omit'
import difference from 'lodash/difference'

export default (state, action) => {
  const { bookingsHotelsSummary, busPaths, date } = action.payload
  const options = mapKeys(bookingsHotelsSummary, '_id')
  const busPathsHotelIds = flatten(
    map(busPaths, busPath => map(busPath.hotels, '_id'))
  )
  const hotelsSelects = map(busPaths, (busPath, index) => {
    const initialValues = intersectionBy(
      bookingsHotelsSummary,
      busPath.hotels,
      '_id'
    )
    const initialValuesHotelIds = map(initialValues, '_id')
    return {
      options: omit(
        options,
        difference(busPathsHotelIds, initialValuesHotelIds)
      ),
      values: map(initialValues, hotel => ({
        value: hotel._id,
        label: `${hotel.name} (${hotel.total})`
      })),
      busPathId: busPath._id,
      busPathName: busPath.name
    }
  })
  return {
    ...state,
    bookingsHotelsSummary,
    hotelsSelects,
    visibilityFilter: { date }
  }
}
