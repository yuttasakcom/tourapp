import _ from 'lodash'
import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  TOGGLE_PROFILE_MENU,
  HIDE_ALL_GEM,
  SIGN_OUT_SUCCESS,
  FETCH_REQUEST_PENDINGS_SUCCESS,
  FETCH_ACCEPT_PENDINGS_SUCCESS,
  FETCH_NOTIFICATIONS_SUCCESS,
  CANCEL_REQUEST_AGENT_SUCCESS,
  REJECT_REQUEST_AGENT_SUCCESS,
  ADD_NOTIFICATION_SUCCESS,
  ACCEPT_AGENT_SUCCESS
} from '../actions/types'

const initialState = {
  showNotificationGem: false,
  showRequestPendingGem: false,
  showAcceptPendingGem: false,
  showProfileMenu: false,
  requestPendings: {},
  acceptPendings: {},
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_AGENT_SUCCESS:
      return {
        ...state,
        acceptPendings: _.omit(state.acceptPendings, action.payload)
      }

    case CANCEL_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        requestPendings: _.omit(state.requestPendings, action.payload)
      }

    case REJECT_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        acceptPendings: _.omit(state.acceptPendings, action.payload)
      }

    case FETCH_REQUEST_PENDINGS_SUCCESS:
      return {
        ...state,
        requestPendings: _.mapKeys(action.payload, '_id')
      }

    case FETCH_ACCEPT_PENDINGS_SUCCESS:
      return {
        ...state,
        acceptPendings: _.mapKeys(action.payload, '_id')
      }

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      }

    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          `Book by ${action.payload.agent.name} package ${action.payload.pkg.name}`
        ]
      }

    case TOGGLE_NOTIFICATION_GEM:
      return {
        ...state,
        showNotificationGem: !state.showNotificationGem,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case TOGGLE_REQUEST_PENDING_GEM:
      return {
        ...state,
        showRequestPendingGem: !state.showRequestPendingGem,
        showNotificationGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case TOGGLE_ACCEPT_PENDING_GEM:
      return {
        ...state,
        showAcceptPendingGem: !state.showAcceptPendingGem,
        showRequestPendingGem: false,
        showNotificationGem: false,
        showProfileMenu: false
      }

    case TOGGLE_PROFILE_MENU:
      return {
        ...state,
        showProfileMenu: !state.showProfileMenu,
        showAcceptPendingGem: false,
        showRequestPendingGem: false,
        showNotificationGem: false
      }

    case HIDE_ALL_GEM:
      return {
        ...state,
        showNotificationGem: false,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        showProfileMenu: false
      }

    default:
      return state
  }
}
