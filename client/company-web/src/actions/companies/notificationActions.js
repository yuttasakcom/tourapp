import axios from './axios'

import {
  COMPANY_TOGGLE_NOTIFICATION_GEM,
  COMPANY_TOGGLE_ACCEPT_PENDING_GEM,
  COMPANY_TOGGLE_REQUEST_PENDING_GEM,
  COMPANY_HIDE_ALL_GEM,
  COMPANY_FETCH_REQUEST_PENDINGS_SUCCESS,
  COMPANY_FETCH_NOTIFICATIONS_SUCCESS,
  COMPANY_FETCH_ACCEPT_PENDINGS_SUCCESS,
  COMPANY_ADD_NOTIFICATION_SUCCESS,
  COMPANY_OPEN_VIEW_AGENT_PROFILE_MODAL,
  COMPANY_CLOSE_VIEW_AGENT_PROFILE_MODAL
} from './types'

export const fetchAcceptPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/accept-pendings')
    dispatch({
      type: COMPANY_FETCH_ACCEPT_PENDINGS_SUCCESS,
      payload: data.acceptPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const addNotification = booking => {
  return {
    type: COMPANY_ADD_NOTIFICATION_SUCCESS,
    payload: booking
  }
}

export const fetchNotifications = () => {
  return {
    type: COMPANY_FETCH_NOTIFICATIONS_SUCCESS,
    payload: []
  }
}

export const fetchRequestPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/request-pendings')
    dispatch({
      type: COMPANY_FETCH_REQUEST_PENDINGS_SUCCESS,
      payload: data.requestPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const openViewAgentProfileModal = _id => {
  return { type: COMPANY_OPEN_VIEW_AGENT_PROFILE_MODAL, payload: _id }
}

export const closeViewAgentProfileModal = () => {
  return { type: COMPANY_CLOSE_VIEW_AGENT_PROFILE_MODAL }
}

export const toggleNotificationGem = () => {
  return { type: COMPANY_TOGGLE_NOTIFICATION_GEM }
}

export const toggleAcceptPendingGem = () => {
  return { type: COMPANY_TOGGLE_ACCEPT_PENDING_GEM }
}

export const toggleRequestPendingGem = () => {
  return { type: COMPANY_TOGGLE_REQUEST_PENDING_GEM }
}

export const hideAllGem = () => {
  return { type: COMPANY_HIDE_ALL_GEM }
}
