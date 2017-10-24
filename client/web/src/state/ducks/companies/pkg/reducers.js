import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { handleActions } from 'redux-actions'

import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  EDIT_PKG_SUCCESS,
  DELETE_PKG_SUCCESS,
  SELECT_PKG
} from './types'

const initialState = {
  pkgs: {},
  selectedPkg: null
}

export default handleActions(
  {
    [FETCH_PKGS_SUCCESS]: (state, action) => ({
      ...state,
      pkgs: mapKeys(action.payload, '_id')
    }),

    [ADD_PKG_SUCCESS]: (state, action) => ({
      ...state,
      pkgs: { ...state.pkgs, [action.payload._id]: action.payload }
    }),

    [EDIT_PKG_SUCCESS]: (state, action) => ({
      ...state,
      pkgs: { ...state.pkgs, [action.payload._id]: action.payload }
    }),

    [DELETE_PKG_SUCCESS]: (state, action) => ({
      ...state,
      pkgs: omit(state.pkgs, action.payload)
    }),

    [SELECT_PKG]: (state, action) => ({ ...state, selectedPkg: action.payload })
  },
  initialState
)
