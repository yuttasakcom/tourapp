const def = action => `COMPANY/NOTIFICATION/${action}`
export const SELECT_ACCEPT_PENDING = def('SELECT_ACCEPT_PENDING')
export const FETCH_ACCEPT_PENDINGS = def('FETCH_ACCEPT_PENDINGS')
export const FETCH_ACCEPT_PENDINGS_SUCCESS = def(
  'FETCH_ACCEPT_PENDINGS_SUCCESS'
)
export const FETCH_NOTIFICATIONS = def('FETCH_NOTIFICATIONS')
export const FETCH_NOTIFICATIONS_SUCCESS = def('FETCH_NOTIFICATIONS_SUCCESS')
export const FETCH_REQUEST_PENDINGS = def('FETCH_REQUEST_PENDINGS')
export const FETCH_REQUEST_PENDINGS_SUCCESS = def(
  'FETCH_REQUEST_PENDINGS_SUCCESS'
)
