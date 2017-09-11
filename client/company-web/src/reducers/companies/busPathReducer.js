import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  FETCH_BUS_PATHS_SUCCESS,
  FETCH_BUS_PATH_HOTELS_SUCCESS,
  ADD_BUS_PATH_SUCCESS,
  EDIT_BUS_PATH_SUCCESS,
  OPEN_BUS_PATHS_MODAL,
  CLOSE_BUS_PATHS_MODAL,
  OPEN_ADD_BUS_PATH_MODAL,
  CLOSE_ADD_BUS_PATH_MODAL,
  OPEN_EDIT_BUS_PATH_MODAL,
  CLOSE_EDIT_BUS_PATH_MODAL,
  OPEN_DELETE_BUS_PATH_MODAL,
  CLOSE_DELETE_BUS_PATH_MODAL,
  DELETE_BUS_PATH_SUCCESS
} from '../../actions/companies/types'

const initialState = {
  busPaths: {},
  manageBusPathHotelsSelect: [],
  selectedPkg: null,
  selectedBusPath: null,
  showBusPathsModal: false,
  showAddBusPathModal: false,
  showEditBusPathModal: false,
  showDeleteBusPathModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUS_PATH_HOTELS_SUCCESS:
      return { ...state, manageBusPathHotelsSelect: action.payload }

    case FETCH_BUS_PATHS_SUCCESS:
      const busPaths = action.payload.map(busPath => {
        busPath.hotels = busPath.hotels.map(hotel => ({
          value: hotel._id,
          label: hotel.name
        }))
        return busPath
      })
      return { ...state, busPaths: mapKeys(busPaths, '_id') }

    case ADD_BUS_PATH_SUCCESS:
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload },
        showAddBusPathModal: false
      }

    case EDIT_BUS_PATH_SUCCESS:
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload },
        showEditBusPathModal: false
      }

    case DELETE_BUS_PATH_SUCCESS:
      return {
        ...state,
        busPaths: omit(state.busPaths, action.payload),
        showDeleteBusPathModal: false
      }

    case OPEN_BUS_PATHS_MODAL:
      return {
        ...state,
        showBusPathsModal: true,
        selectedPkg: action.payload
      }

    case CLOSE_BUS_PATHS_MODAL:
      return { ...state, showBusPathsModal: false }

    case OPEN_ADD_BUS_PATH_MODAL:
      return { ...state, showAddBusPathModal: true }

    case CLOSE_ADD_BUS_PATH_MODAL:
      return { ...state, showAddBusPathModal: false }

    case OPEN_EDIT_BUS_PATH_MODAL:
      return {
        ...state,
        showEditBusPathModal: true,
        selectedBusPath: action.payload
      }

    case CLOSE_EDIT_BUS_PATH_MODAL:
      return { ...state, showEditBusPathModal: false }

    case OPEN_DELETE_BUS_PATH_MODAL:
      return {
        ...state,
        showDeleteBusPathModal: true,
        selectedBusPath: action.payload
      }

    case CLOSE_DELETE_BUS_PATH_MODAL:
      return { ...state, showDeleteBusPathModal: false }

    default:
      return state
  }
}
