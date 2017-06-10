import _ from 'lodash'
import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_EDIT_PKG_MODAL,
  CLOSE_EDIT_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL,
  DELETE_PKG_SUCCESS,
  HIDE_PKG_NOTIFICATION
} from '../actions/types'

const initialState = {
  pkgs: {},
  selectedPkg: null,
  showAddPkgModal: false,
  showEditPkgModal: false,
  showDeletePkgModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: _.mapKeys(action.payload, '_id') }

    case ADD_PKG_SUCCESS:
      return {
        ...state,
        pkgs: { ...state.pkgs, [action.payload._id]: action.payload },
        showAddPkgModal: false,
        notification: {
          show: true,
          type: 'success',
          message: 'Add package success'
        }
      }

    case DELETE_PKG_SUCCESS:
      const { _id, data: { message } } = action.payload
      return {
        ...state,
        pkgs: _.omit(state.pkgs, _id),
        showDeletePkgModal: false,
        notification: {
          show: true,
          type: 'success',
          message
        }
      }

    case HIDE_PKG_NOTIFICATION:
      return {
        ...state,
        notification: { show: false }
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
