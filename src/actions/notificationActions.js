import {
  TOGGLE_NOTIFICATION_GEM,
  TOGGLE_ACCEPT_PENDING_GEM,
  TOGGLE_REQUEST_PENDING_GEM,
  HIDE_ALL_GEM
} from './types'

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
