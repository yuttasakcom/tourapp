export default {
  SELECT_BUS_PATH: id => id,
  FETCH_BUS_PATHS: pkgId => pkgId,
  FETCH_BUS_PATHS_SUCCESS: payload => payload,
  FETCH_BUS_PATH_HOTELS: (busPathId = '') => busPathId,
  FETCH_BUS_PATH_HOTELS_SUCCESS: payload => payload,
  ADD_BUS_PATH: payload => payload,
  ADD_BUS_PATH_SUCCESS: payload => payload,
  EDIT_BUS_PATH: payload => payload,
  EDIT_BUS_PATH_SUCCESS: payload => payload,
  DELETE_BUS_PATH: id => id,
  DELETE_BUS_PATH_SUCCESS: id => id
}
