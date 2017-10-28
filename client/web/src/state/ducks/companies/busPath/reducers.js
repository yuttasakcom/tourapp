import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { handleActions } from 'redux-actions'
import {
  FETCH_BUS_PATHS_SUCCESS,
  FETCH_BUS_PATH_HOTELS_SUCCESS,
  ADD_BUS_PATH_SUCCESS,
  EDIT_BUS_PATH_SUCCESS,
  DELETE_BUS_PATH_SUCCESS,
  SELECT_BUS_PATH,
  SELECT_PKG
} from './types'

const initialState = {
  busPaths: {},
  manageBusPathHotelsSelect: [],
  selectedPkg: null,
  selectedBusPath: null
}

export default handleActions(
  {
    [FETCH_BUS_PATH_HOTELS_SUCCESS]: (state, action) => ({
      ...state,
      manageBusPathHotelsSelect: action.payload
    }),

    [FETCH_BUS_PATHS_SUCCESS]: (state, action) => {
      const busPaths = action.payload.map(busPath => {
        busPath.hotels = busPath.hotels.map(hotel => ({
          value: hotel._id,
          label: hotel.name
        }))
        return busPath
      })
      return { ...state, busPaths: mapKeys(busPaths, '_id') }
    },

    [ADD_BUS_PATH_SUCCESS]: (state, action) => {
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload }
      }
    },

    [EDIT_BUS_PATH_SUCCESS]: (state, action) => {
      action.payload.hotels = action.payload.hotels.map(hotel => ({
        value: hotel._id,
        label: hotel.name
      }))
      return {
        ...state,
        busPaths: { ...state.busPaths, [action.payload._id]: action.payload }
      }
    },

    [DELETE_BUS_PATH_SUCCESS]: (state, action) => ({
      ...state,
      busPaths: omit(state.busPaths, action.payload)
    }),

    [SELECT_PKG]: (state, action) => ({
      ...state,
      selectedPkg: action.payload
    }),

    [SELECT_BUS_PATH]: (state, action) => ({
      ...state,
      selectedBusPath: action.payload
    })
  },
  initialState
)
