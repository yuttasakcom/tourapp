const def = action => `COMPANY/BOOKING/${action}`
export const UPDATE_BOOKING_STATUS = def('UPDATE_BOOKING_STATUS')
export const UPDATE_BOOKING_STATUS_SUCCESS = def(
  'UPDATE_BOOKING_STATUS_SUCCESS'
)
export const SET_BOOKINGS_STATUS_VISIBILITY_FILTER = def(
  'SET_BOOKINGS_STATUS_VISIBILITY_FILTER'
)
export const SET_BOOKINGS_DATE_VISIBILITY_FILTER = def(
  'SET_BOOKINGS_DATE_VISIBILITY_FILTER'
)
export const FETCH_BOOKINGS = def('FETCH_BOOKINGS')
export const FETCH_BOOKINGS_SUCCESS = def('FETCH_BOOKINGS_SUCCESS')
export const SELECT_BOOKING = def('SELECT_BOOKING')
