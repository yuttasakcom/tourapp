import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from '../actions/types'

const initialState = {
  authenticated: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { authenticated: true }

    case SIGN_OUT_SUCCESS:
      return { authenticated: false }
      
    default:
      return state
  }
}
