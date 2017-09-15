import { AGENT_FETCH_DASHBOARD_SUCCESS } from '../../actions/agents/types'

const initialState = {
  bookingsSummaries: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        bookingsSummary: action.payload
      }

    default:
      return state
  }
}
