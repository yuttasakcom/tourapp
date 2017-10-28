import mapKeys from 'lodash/mapKeys'
import { handleActions } from 'redux-actions'

import { FETCH_PKGS_SUCCESS, FETCH_HOTELS_SUCCESS, SELECT_PKG } from './types'

const initialState = {
  pkgs: {},
  hotels: [],
  selectedPkg: null
}

export default handleActions(
  {
    [FETCH_PKGS_SUCCESS]: (state, action) => ({
      ...state,
      pkgs: mapKeys(action.payload, '_id')
    }),

    [FETCH_HOTELS_SUCCESS]: (state, action) => ({
      ...state,
      hotels: action.payload
    }),

    [SELECT_PKG]: (state, action) => ({
      ...state,
      selectedPkg: action.payload
    })
  },
  initialState
)
