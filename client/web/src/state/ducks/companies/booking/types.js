const def = action => `COMPANY/BOOKING/${action}`
export const UPDATE_BOOKING_STATUS = def('UPDATE_BOOKING_STATUS')
export const SET_BOOKINGS_STATUS_VISIBILITY_FILTER = def(
  'SET_BOOKINGS_STATUS_VISIBILITY_FILTER'
)
export const FETCH_BOOKINGS = def('FETCH_BOOKINGS')
export const FETCH_BOOKINGS_SUCCESS = def('FETCH_BOOKINGS_SUCCESS')
export const ACCEPT_BOOKING = def('ACCEPT_BOOKING')
export const ACCEPT_BOOKING_SUCCESS = def('ACCEPT_BOOKING_SUCCESS')
export const REJECT_BOOKING = def('REJECT_BOOKING')
export const REJECT_BOOKING_SUCCESS = def('REJECT_BOOKING_SUCCESS')
export const COMPLETE_BOOKING = def('COMPLETE_BOOKING')
export const COMPLETE_BOOKING_SUCCESS = def('COMPLETE_BOOKING_SUCCESS')
export const OPEN_MANAGE_BOOKING_MODAL = def('OPEN_MANAGE_BOOKING_MODAL')
export const CLOSE_MANAGE_BOOKING_MODAL = def('CLOSE_MANAGE_BOOKING_MODAL')
