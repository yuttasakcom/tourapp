import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  HIDE_ALL_GEM
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
        showNotificationGem: !state.showNotificationGem,
        showRequestPendingGem: false,
        showAcceptPendingGem: false
      }

    case TOGGLE_REQUEST_PENDING_GEM:
      return {
        showRequestPendingGem: !state.showRequestPendingGem,
        showNotificationGem: false,
        showAcceptPendingGem: false
      }

    case TOGGLE_ACCEPT_PENDING_GEM:
      return {
        showAcceptPendingGem: !state.showAcceptPendingGem,
        showRequestPendingGem: false,
        showNotificationGem: false
      }

    case HIDE_ALL_GEM:
      return {
        showNotificationGem: false,
        showRequestPendingGem: false,
        showAcceptPendingGem: false
      }

    default:
      return state
  }
}
