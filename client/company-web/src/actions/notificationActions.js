import axios from './axios'

import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  HIDE_ALL_GEM,
  FETCH_REQUEST_PENDINGS_SUCCESS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_ACCEPT_PENDINGS_SUCCESS,
  ADD_NOTIFICATION_SUCCESS,
  OPEN_VIEW_AGENT_PROFILE_MODAL,
  CLOSE_VIEW_AGENT_PROFILE_MODAL
} from './types'

export const fetchAcceptPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/accept-pendings')
    dispatch({
      type: FETCH_ACCEPT_PENDINGS_SUCCESS,
      payload: data.acceptPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const addNotification = booking => {
  return {
    type: ADD_NOTIFICATION_SUCCESS,
    payload: booking
  }
}

export const fetchNotifications = () => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: []
  }
}

export const fetchRequestPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/request-pendings')
    dispatch({
      type: FETCH_REQUEST_PENDINGS_SUCCESS,
      payload: data.requestPendings
    })
  } catch (e) {
    console.error(e)
  }
}

export const openViewAgentProfileModal = _id => {
  return { type: OPEN_VIEW_AGENT_PROFILE_MODAL, payload: _id }
}

export const closeViewAgentProfileModal = () => {
  return { type: CLOSE_VIEW_AGENT_PROFILE_MODAL }
}

export const toggleNotificationGem = () => {
  return { type: TOGGLE_NOTIFICATION_GEM }
}

export const toggleAcceptPendingGem = () => {
  return { type: TOGGLE_ACCEPT_PENDING_GEM }
}

export const toggleRequestPendingGem = () => {
  return { type: TOGGLE_REQUEST_PENDING_GEM }
}

export const hideAllGem = () => {
  return { type: HIDE_ALL_GEM }
}
