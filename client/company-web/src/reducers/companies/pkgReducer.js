import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  EDIT_PKG_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_EDIT_PKG_MODAL,
  CLOSE_EDIT_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL,
  DELETE_PKG_SUCCESS
} from '../../actions/companies/types'

const initialState = {
  pkgs: {},
  selectedPkg: null,
  showAddPkgModal: false,
  showEditPkgModal: false,
  showDeletePkgModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: mapKeys(action.payload, '_id') }

    case ADD_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload },
        showAddPkgModal: false
      }

    case EDIT_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload },
        showEditPkgModal: false
      }

    case DELETE_PKG_SUCCESS:
      return {
        ...state,
        pkgs: omit(state.pkgs, action.payload),
        showDeletePkgModal: false
      }

    case OPEN_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: true }

    case CLOSE_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: false }

    case OPEN_EDIT_PKG_MODAL:
      return { ...state, showEditPkgModal: true, selectedPkg: action.payload }

    case CLOSE_EDIT_PKG_MODAL:
      return { ...state, showEditPkgModal: false }

    case OPEN_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: true, selectedPkg: action.payload }

    case CLOSE_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: false }

    default:
      return state
  }
}
