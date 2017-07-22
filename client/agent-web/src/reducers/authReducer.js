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
  _id: '',
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, authenticated: true, user: action.payload }

    case SIGN_IN_FAIL:
      return {
        ...state,
        notification: {
          show: true,
          type: 'danger',
          message: action.payload
        }
      }

    case SIGN_UP_SUCCESS:
      return { ...state, authenticated: true, _id: action.payload }

    case SIGN_UP_FAIL:
      return {
        ...state,
        notification: {
          show: true,
          type: 'danger',
          message: action.payload
        }
      }

    case HIDE_AUTH_NOTIFICATION:
      return { ...state, notification: { show: false } }

    case SIGN_OUT_SUCCESS:
      return { ...state, authenticated: false }

    default:
      return state
  }
}
