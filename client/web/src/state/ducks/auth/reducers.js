import { handleActions } from 'redux-actions'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './types'

const initialState = {
  authenticated: false,
  user: ''
}

export default handleActions(
  {
    [SIGN_IN_SUCCESS]: (state, action) => ({
      ...state,
      authenticated: true,
      user: action.payload
    }),
    [SIGN_OUT_SUCCESS]: (state, action) => ({ ...state, authenticated: false })
  },
  initialState
)
