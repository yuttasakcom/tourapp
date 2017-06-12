import axios from './axios'

import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  HIDE_ALL_GEM,
  FETCH_REQUEST_PENDINGS_SUCCESS
} from './types'

export const fetchRequestPendings = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies/request-pendings')
    dispatch({
      type: FETCH_REQUEST_PENDINGS_SUCCESS,
      payload: data.requestPendings
    })
  } catch (e) {
    console.error(e)
  }
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
