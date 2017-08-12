import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS
} from '../actions/types'

const initialState = {
  authenticated: false,
  user: '',
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, authenticated: true, user: action.payload }

    case SIGN_UP_SUCCESS:
      return { ...state, authenticated: true, user: action.payload }

    case SIGN_OUT_SUCCESS:
      return { ...state, authenticated: false }

    default:
      return state
  }
}
