import { OPEN_ADD_PKG_MODAL, CLOSE_ADD_PKG_MODAL } from '../../actions/types'

const initialState = { showAddPkgModal: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: true }

    case CLOSE_ADD_PKG_MODAL:
      return { ...state, showAddPkgModal: false }

    default:
      return state
  }
}
