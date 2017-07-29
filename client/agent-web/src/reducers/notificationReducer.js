import _ from 'lodash'

import * as bookingStatus from '../actions/bookingStatus'
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
  CANCEL_REQUEST_COMPANY_SUCCESS,
  REJECT_REQUEST_COMPANY_SUCCESS,
  ACCEPT_COMPANY_SUCCESS,
  ADD_NOTIFICATION_SUCCESS,
  OPEN_VIEW_COMPANY_PROFILE_MODAL,
  CLOSE_VIEW_COMPANY_PROFILE_MODAL
} from '../actions/types'

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
    case OPEN_VIEW_COMPANY_PROFILE_MODAL:
      return {
        ...state,
        showViewCompanyProfileModal: true,
        selectedAcceptPending: action.payload
      }

    case CLOSE_VIEW_COMPANY_PROFILE_MODAL:
      return { ...state, showViewCompanyProfileModal: false }

    case ACCEPT_COMPANY_SUCCESS:
      return {
        ...state,
        showViewCompanyProfileModal: false,
        acceptPendings: _.omit(state.acceptPendings, action.payload)
      }

    case CANCEL_REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        requestPendings: _.omit(state.requestPendings, action.payload)
      }

    case REJECT_REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        showViewCompanyProfileModal: false,
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
