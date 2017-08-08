import { FETCH_DASHBOARD_SUCCESS } from '../actions/types'

const initialState = {
  dashboard: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload
      }

    default:
      return state
  }
}
