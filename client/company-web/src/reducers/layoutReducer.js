import { TOGGLE_MENU, CLOSE_MENU } from '../actions/types'

const initialState = {
  showMenu: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu }

    case CLOSE_MENU:
      return { ...state, showMenu: false }

    default:
      return state
  }
}
