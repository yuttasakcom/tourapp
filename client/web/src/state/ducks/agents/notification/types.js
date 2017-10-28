const def = action => `AGENT/NOTIFICATION/${action}`
export const SELECT_ACCEPT_PENDING = def('SELECT_ACCEPT_PENDING')
export const FETCH_ACCEPT_PENDINGS = def('FETCH_ACCEPT_PENDINGS')
export const FETCH_ACCEPT_PENDINGS_SUCCESS = def(
  'FETCH_ACCEPT_PENDINGS_SUCCESS'
)
export const FETCH_NOTIFICATIONS = def('FETCH_NOTIFICATIONS')
export const FETCH_NOTIFICATIONS_SUCCESS = def('FETCH_NOTIFICATIONS_SUCCESS')
export const ADD_NOTIFICATION = def('ADD_NOTIFICATION')
export const ADD_NOTIFICATION_SUCCESS = def('ADD_NOTIFICATION_SUCCESS')
export const FETCH_REQUEST_PENDINGS = def('FETCH_REQUEST_PENDINGS')
export const FETCH_REQUEST_PENDINGS_SUCCESS = def(
  'FETCH_REQUEST_PENDINGS_SUCCESS'
)
export const ACCEPT_COMPANY = def('ACCEPT_COMPANY')
export const ACCEPT_COMPANY_SUCCESS = def('ACCEPT_COMPANY_SUCCESS')
export const CANCEL_REQUEST_COMPANY = def('CANCEL_REQUEST_COMPANY')
export const CANCEL_REQUEST_COMPANY_SUCCESS = def(
  'CANCEL_REQUEST_COMPANY_SUCCESS'
)
export const REJECT_REQUEST_COMPANY = def('REJECT_REQUEST_COMPANY')
export const REJECT_REQUEST_COMPANY_SUCCESS = def(
  'REJECT_REQUEST_COMPANY_SUCCESS'
)