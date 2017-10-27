import { handleActions } from 'redux-actions'

import { FETCH_DASHBOARD_SUCCESS } from './types'

const initialState = {
  bookingsSummaries: []
}

export default handleActions(
  {
    [FETCH_DASHBOARD_SUCCESS]: (state, action) => ({
      ...state,
      bookingsSummary: action.payload
    })
  },
  initialState
)
