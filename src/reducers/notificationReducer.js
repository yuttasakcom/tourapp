import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM
} from '../actions/types'

const initialState = {
  showNotificationGem: false,
  showRequestPendingGem: false,
  showAcceptPendingGem: false
}

export default (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state
  }
}
