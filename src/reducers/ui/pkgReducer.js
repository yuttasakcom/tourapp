import {
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL
} from '../../actions/types'

const initialState = { showAddPkgModal: false, showDeletePkgModal: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: true }

    case CLOSE_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: false }

    case OPEN_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: true }

    case CLOSE_DELETE_PKG_MODAL:
      return { ...state, showDeletePkgModal: false }

    default:
      return state
  }
}
