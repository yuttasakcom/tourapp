import _ from 'lodash'
import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL,
  DELETE_PKG_SUCCESS
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

    case ADD_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload },
        showAddPkgModal: false
      }

    case DELETE_PKG_SUCCESS:
      console.log(action.payload)
      const { _id, data } = action.payload
      return {
        ...state,
        pkgs: _.omit(state.pkgs, _id),
        showDeletePkgModal: false
      }

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
