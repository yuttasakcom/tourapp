import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  HIDE_AUTH_NOTIFICATION,
  TOGGLE_PROFILE_MENU,
  HIDE_ALL_GEM
} from '../actions/types'

const initialState = {
  authenticated: false,
  _id: null,
  showProfileMenu: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_ALL_GEM:
      return { ...state, showProfileMenu: false }

    case TOGGLE_PROFILE_MENU:
      return { ...state, showProfileMenu: !state.showProfileMenu }

    case SIGN_IN_SUCCESS:
      return { ...state, authenticated: true, _id: action.payload }

    case SIGN_IN_FAIL:
      return { ...state, notification: { ...action.payload, show: true } }

    case SIGN_UP_SUCCESS:
      return { ...state, authenticated: true, _id: action.payload }

    case SIGN_UP_FAIL:
      return { ...state, notification: { ...action.payload, show: true } }

    case HIDE_AUTH_NOTIFICATION:
      return { ...state, notification: { show: false } }

    case SIGN_OUT_SUCCESS:
      return { ...state, authenticated: false }

    default:
      return state
  }
}
