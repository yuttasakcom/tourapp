import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  HIDE_ALL_GEM,
  FETCH_REQUEST_PENDINGS_SUCCESS
} from '../actions/types'

const initialState = {
  showNotificationGem: false,
  showRequestPendingGem: false,
  showAcceptPendingGem: false,
  requestPendings: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_PENDINGS_SUCCESS:
      return {
        ...state,
        requestPendings: action.payload
      }

    case TOGGLE_NOTIFICATION_GEM:
      return {
        ...state,
        showNotificationGem: !state.showNotificationGem,
        showRequestPendingGem: false,
        showAcceptPendingGem: false
      }

    case TOGGLE_REQUEST_PENDING_GEM:
      return {
        ...state,
        showRequestPendingGem: !state.showRequestPendingGem,
        showNotificationGem: false,
        showAcceptPendingGem: false
      }

    case TOGGLE_ACCEPT_PENDING_GEM:
      return {
        ...state,
        showAcceptPendingGem: !state.showAcceptPendingGem,
        showRequestPendingGem: false,
        showNotificationGem: false
      }

    case HIDE_ALL_GEM:
      return {
        ...state,
        showNotificationGem: false,
        showRequestPendingGem: false,
        showAcceptPendingGem: false
      }

    default:
      return state
  }
}
