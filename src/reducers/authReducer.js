import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  HIDE_AUTH_NOTIFICATION
} from '../actions/types'

const initialState = {
  authenticated: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, authenticated: true }

    case SIGN_IN_FAIL:
      return { ...state, notification: { ...action.payload, show: true } }

    case SIGN_UP_SUCCESS:
      return { ...state, authenticated: true }

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
