import _ from 'lodash'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL
} from '../actions/types'

const initialState = {
  pkgs: {},
  selectedPkg: null,
  showAddPkgModal: false,
  showDeletePkgModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: _.mapKeys(action.payload, '_id') }

    case OPEN_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: true }

    case CLOSE_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: false }

    case OPEN_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: true, selectedPkg: action.payload }

    case CLOSE_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: false }

    default:
      return state
  }
}
