import { FETCH_DASHBOARD_SUCCESS } from '../../actions/companies/types'

const initialState = {
  bookingsSummaries: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        bookingsSummaries: action.payload
      }

    default:
      return state
  }
}
