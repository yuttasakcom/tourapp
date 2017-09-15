import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  COMPANY_FETCH_BUS_PATHS_SUCCESS,
  COMPANY_FETCH_BUS_PATH_HOTELS_SUCCESS,
  COMPANY_ADD_BUS_PATH_SUCCESS,
  COMPANY_EDIT_BUS_PATH_SUCCESS,
  COMPANY_OPEN_BUS_PATHS_MODAL,
  COMPANY_CLOSE_BUS_PATHS_MODAL,
  COMPANY_OPEN_ADD_BUS_PATH_MODAL,
  COMPANY_CLOSE_ADD_BUS_PATH_MODAL,
  COMPANY_OPEN_EDIT_BUS_PATH_MODAL,
  COMPANY_CLOSE_EDIT_BUS_PATH_MODAL,
  COMPANY_OPEN_DELETE_BUS_PATH_MODAL,
  COMPANY_CLOSE_DELETE_BUS_PATH_MODAL,
  COMPANY_DELETE_BUS_PATH_SUCCESS
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
    case COMPANY_FETCH_BUS_PATH_HOTELS_SUCCESS:
      return { ...state, manageBusPathHotelsSelect: action.payload }

    case COMPANY_FETCH_BUS_PATHS_SUCCESS:
      const busPaths = action.payload.map(busPath => {
        busPath.hotels = busPath.hotels.map(hotel => ({
          value: hotel._id,
          label: hotel.name
        }))
        return busPath
      })
      return { ...state, busPaths: mapKeys(busPaths, '_id') }

    case COMPANY_ADD_BUS_PATH_SUCCESS:
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload },
        showAddBusPathModal: false
      }

    case COMPANY_EDIT_BUS_PATH_SUCCESS:
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload },
        showEditBusPathModal: false
      }

    case COMPANY_DELETE_BUS_PATH_SUCCESS:
      return {
        ...state,
        busPaths: omit(state.busPaths, action.payload),
        showDeleteBusPathModal: false
      }

    case COMPANY_OPEN_BUS_PATHS_MODAL:
      return {
        ...state,
        showBusPathsModal: true,
        selectedPkg: action.payload
      }

    case COMPANY_CLOSE_BUS_PATHS_MODAL:
      return { ...state, showBusPathsModal: false }

    case COMPANY_OPEN_ADD_BUS_PATH_MODAL:
      return { ...state, showAddBusPathModal: true }

    case COMPANY_CLOSE_ADD_BUS_PATH_MODAL:
      return { ...state, showAddBusPathModal: false }

    case COMPANY_OPEN_EDIT_BUS_PATH_MODAL:
      return {
        ...state,
        showEditBusPathModal: true,
        selectedBusPath: action.payload
      }

    case COMPANY_CLOSE_EDIT_BUS_PATH_MODAL:
      return { ...state, showEditBusPathModal: false }

    case COMPANY_OPEN_DELETE_BUS_PATH_MODAL:
      return {
        ...state,
        showDeleteBusPathModal: true,
        selectedBusPath: action.payload
      }

    case COMPANY_CLOSE_DELETE_BUS_PATH_MODAL:
      return { ...state, showDeleteBusPathModal: false }

    default:
      return state
  }
}
