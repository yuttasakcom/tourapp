import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  COMPANY_TOGGLE_NOTIFICATION_GEM,
  COMPANY_TOGGLE_ACCEPT_PENDING_GEM,
  COMPANY_TOGGLE_REQUEST_PENDING_GEM,
  COMPANY_TOGGLE_PROFILE_MENU,
  COMPANY_HIDE_ALL_GEM,
  COMPANY_SIGN_OUT_SUCCESS,
  COMPANY_FETCH_REQUEST_PENDINGS_SUCCESS,
  COMPANY_FETCH_ACCEPT_PENDINGS_SUCCESS,
  COMPANY_FETCH_NOTIFICATIONS_SUCCESS,
  COMPANY_CANCEL_REQUEST_AGENT_SUCCESS,
  COMPANY_REJECT_REQUEST_AGENT_SUCCESS,
  COMPANY_ADD_NOTIFICATION_SUCCESS,
  COMPANY_ACCEPT_AGENT_SUCCESS,
  COMPANY_OPEN_VIEW_AGENT_PROFILE_MODAL,
  COMPANY_CLOSE_VIEW_AGENT_PROFILE_MODAL
} from '../../actions/companies/types'

const initialState = {
  showNotificationGem: false,
  showRequestPendingGem: false,
  showAcceptPendingGem: false,
  showProfileMenu: false,
  showViewAgentProfileModal: false,
  requestPendings: {},
  acceptPendings: {},
  selectedAcceptPending: null,
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_OPEN_VIEW_AGENT_PROFILE_MODAL:
      return {
        ...state,
        showViewAgentProfileModal: true,
        selectedAcceptPending: action.payload
      }

    case COMPANY_CLOSE_VIEW_AGENT_PROFILE_MODAL:
      return { ...state, showViewAgentProfileModal: false }

    case COMPANY_ACCEPT_AGENT_SUCCESS:
      return {
        ...state,
        showViewAgentProfileModal: false,
        acceptPendings: omit(state.acceptPendings, action.payload)
      }

    case COMPANY_CANCEL_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        requestPendings: omit(state.requestPendings, action.payload)
      }

    case COMPANY_REJECT_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        showViewAgentProfileModal: false,
        acceptPendings: omit(state.acceptPendings, action.payload)
      }

    case COMPANY_FETCH_REQUEST_PENDINGS_SUCCESS:
      return {
        ...state,
        requestPendings: mapKeys(action.payload, '_id')
      }

    case COMPANY_FETCH_ACCEPT_PENDINGS_SUCCESS:
      return {
        ...state,
        acceptPendings: mapKeys(action.payload, '_id')
      }

    case COMPANY_FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      }

    case COMPANY_ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          `Book by ${action.payload.agent.name} package ${action.payload.pkg
            .name}`
        ]
      }

    case COMPANY_TOGGLE_NOTIFICATION_GEM:
      return {
        ...state,
        showNotificationGem: !state.showNotificationGem,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case COMPANY_TOGGLE_REQUEST_PENDING_GEM:
      return {
        ...state,
        showRequestPendingGem: !state.showRequestPendingGem,
        showNotificationGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case COMPANY_TOGGLE_ACCEPT_PENDING_GEM:
      return {
        ...state,
        showAcceptPendingGem: !state.showAcceptPendingGem,
        showRequestPendingGem: false,
        showNotificationGem: false,
        showProfileMenu: false
      }

    case COMPANY_TOGGLE_PROFILE_MENU:
      return {
        ...state,
        showProfileMenu: !state.showProfileMenu,
        showAcceptPendingGem: false,
        showRequestPendingGem: false,
        showNotificationGem: false
      }

    case COMPANY_HIDE_ALL_GEM:
      return {
        ...state,
        showNotificationGem: false,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case COMPANY_SIGN_OUT_SUCCESS:
      return {
        ...state,
        showProfileMenu: false
      }

    default:
      return state
  }
}
