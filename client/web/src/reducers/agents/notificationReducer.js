import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'

import * as bookingStatus from '../../actions/bookingStatus'
import {
  AGENT_TOGGLE_NOTIFICATION_GEM,
  AGENT_TOGGLE_ACCEPT_PENDING_GEM,
  AGENT_TOGGLE_REQUEST_PENDING_GEM,
  AGENT_TOGGLE_PROFILE_MENU,
  AGENT_HIDE_ALL_GEM,
  AGENT_SIGN_OUT_SUCCESS,
  AGENT_FETCH_REQUEST_PENDINGS_SUCCESS,
  AGENT_FETCH_ACCEPT_PENDINGS_SUCCESS,
  AGENT_FETCH_NOTIFICATIONS_SUCCESS,
  AGENT_CANCEL_REQUEST_COMPANY_SUCCESS,
  AGENT_REJECT_REQUEST_COMPANY_SUCCESS,
  AGENT_ACCEPT_COMPANY_SUCCESS,
  AGENT_ADD_NOTIFICATION_SUCCESS,
  AGENT_OPEN_VIEW_COMPANY_PROFILE_MODAL,
  AGENT_CLOSE_VIEW_COMPANY_PROFILE_MODAL
} from '../../actions/agents/types'

const initialState = {
  showNotificationGem: false,
  showRequestPendingGem: false,
  showAcceptPendingGem: false,
  showViewCompanyProfileModal: false,
  showProfileMenu: false,
  requestPendings: {},
  acceptPendings: {},
  selectedAcceptPending: null,
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_OPEN_VIEW_COMPANY_PROFILE_MODAL:
      return {
        ...state,
        showViewCompanyProfileModal: true,
        selectedAcceptPending: action.payload
      }

    case AGENT_CLOSE_VIEW_COMPANY_PROFILE_MODAL:
      return { ...state, showViewCompanyProfileModal: false }

    case AGENT_ACCEPT_COMPANY_SUCCESS:
      return {
        ...state,
        showViewCompanyProfileModal: false,
        acceptPendings: omit(state.acceptPendings, action.payload)
      }

    case AGENT_CANCEL_REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        requestPendings: omit(state.requestPendings, action.payload)
      }

    case AGENT_REJECT_REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        showViewCompanyProfileModal: false,
        acceptPendings: omit(state.acceptPendings, action.payload)
      }

    case AGENT_FETCH_REQUEST_PENDINGS_SUCCESS:
      return {
        ...state,
        requestPendings: mapKeys(action.payload, '_id')
      }

    case AGENT_FETCH_ACCEPT_PENDINGS_SUCCESS:
      return {
        ...state,
        acceptPendings: mapKeys(action.payload, '_id')
      }

    case AGENT_FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      }

    case AGENT_ADD_NOTIFICATION_SUCCESS:
      const bookingStatusKeys = Object.keys(bookingStatus)
      return {
        ...state,
        notifications: [
          ...state.notifications,
          `Pkg: ${action.payload.pkg.name} Company: ${action.payload.company
            .name} Update status from: ${bookingStatusKeys[
            action.payload.status
          ]} to: ${bookingStatusKeys[action.payload.updatedStatus]}`
        ]
      }

    case AGENT_TOGGLE_NOTIFICATION_GEM:
      return {
        ...state,
        showNotificationGem: !state.showNotificationGem,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case AGENT_TOGGLE_REQUEST_PENDING_GEM:
      return {
        ...state,
        showRequestPendingGem: !state.showRequestPendingGem,
        showNotificationGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case AGENT_TOGGLE_ACCEPT_PENDING_GEM:
      return {
        ...state,
        showAcceptPendingGem: !state.showAcceptPendingGem,
        showRequestPendingGem: false,
        showNotificationGem: false,
        showProfileMenu: false
      }

    case AGENT_TOGGLE_PROFILE_MENU:
      return {
        ...state,
        showProfileMenu: !state.showProfileMenu,
        showAcceptPendingGem: false,
        showRequestPendingGem: false,
        showNotificationGem: false
      }

    case AGENT_HIDE_ALL_GEM:
      return {
        ...state,
        showNotificationGem: false,
        showRequestPendingGem: false,
        showAcceptPendingGem: false,
        showProfileMenu: false
      }

    case AGENT_SIGN_OUT_SUCCESS:
      return {
        ...state,
        showProfileMenu: false
      }

    default:
      return state
  }
}
