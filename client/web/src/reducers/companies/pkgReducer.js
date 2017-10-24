import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  COMPANY_FETCH_PKGS_SUCCESS,
  COMPANY_ADD_PKG_SUCCESS,
  COMPANY_EDIT_PKG_SUCCESS,
  COMPANY_DELETE_PKG_SUCCESS,
  COMPANY_SELECT_PKG
} from '../../actions/companies/types'

const initialState = {
  pkgs: {},
  selectedPkg: null,
  showEditPkgModal: false,
  showDeletePkgModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: mapKeys(action.payload, '_id') }

    case COMPANY_ADD_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload },
        showAddPkgModal: false
      }

    case COMPANY_EDIT_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload }
      }

    case COMPANY_DELETE_PKG_SUCCESS:
      return {
        ...state,
        pkgs: omit(state.pkgs, action.payload)
      }

    case COMPANY_SELECT_PKG:
      return { ...state, selectedPkg: action.payload }

    default:
      return state
  }
}
