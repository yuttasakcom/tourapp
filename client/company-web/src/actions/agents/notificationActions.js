import axios from './axios'

import {
  AGENT_TOGGLE_NOTIFICATION_GEM,
  AGENT_TOGGLE_ACCEPT_PENDING_GEM,
  AGENT_TOGGLE_REQUEST_PENDING_GEM,
  AGENT_HIDE_ALL_GEM,
  AGENT_FETCH_REQUEST_PENDINGS_SUCCESS,
  AGENT_FETCH_NOTIFICATIONS_SUCCESS,
  AGENT_FETCH_ACCEPT_PENDINGS_SUCCESS,
  AGENT_ADD_NOTIFICATION_SUCCESS,
  AGENT_OPEN_VIEW_COMPANY_PROFILE_MODAL,
  AGENT_CLOSE_VIEW_COMPANY_PROFILE_MODAL
} from './types'

export const fetchAcceptPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/accept-pendings')
    dispatch({
      type: AGENT_FETCH_ACCEPT_PENDINGS_SUCCESS,
      payload: data.acceptPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const addNotification = booking => {
  return {
    type: AGENT_ADD_NOTIFICATION_SUCCESS,
    payload: booking
  }
}

export const fetchNotifications = () => {
  return {
    type: AGENT_FETCH_NOTIFICATIONS_SUCCESS,
    payload: []
  }
}

export const fetchRequestPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/request-pendings')
    dispatch({
      type: AGENT_FETCH_REQUEST_PENDINGS_SUCCESS,
      payload: data.requestPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const openViewCompanyProfileModal = _id => {
  return { type: AGENT_OPEN_VIEW_COMPANY_PROFILE_MODAL, payload: _id }
}

export const closeViewCompanyProfileModal = () => {
  return { type: AGENT_CLOSE_VIEW_COMPANY_PROFILE_MODAL }
}

export const toggleNotificationGem = () => {
  return { type: AGENT_TOGGLE_NOTIFICATION_GEM }
}

export const toggleAcceptPendingGem = () => {
  return { type: AGENT_TOGGLE_ACCEPT_PENDING_GEM }
}

export const toggleRequestPendingGem = () => {
  return { type: AGENT_TOGGLE_REQUEST_PENDING_GEM }
}

export const hideAllGem = () => {
  return { type: AGENT_HIDE_ALL_GEM }
}
