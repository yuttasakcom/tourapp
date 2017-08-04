import mapKeys from 'lodash/mapKeys'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_BOOKING_MODAL,
  CLOSE_ADD_BOOKING_MODAL,
  ADD_BOOKING_SUCCESS,
  HIDE_BOOKING_NOTIFICATION
} from '../actions/types'

const initialState = {
  pkgs: {},
  selectedPkg: null,
  showAddBookingModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: mapKeys(action.payload, '_id') }

    case OPEN_ADD_BOOKING_MODAL:
      return {
        ...state,
        showAddBookingModal: true,
        selectedPkg: action.payload
      }

    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        showAddBookingModal: false,
        notification: {
          show: true,
          type: 'success',
          message: 'Add booking success'
        }
      }

    case CLOSE_ADD_BOOKING_MODAL:
      return { ...state, showAddBookingModal: false }

    case HIDE_BOOKING_NOTIFICATION:
      return {
        ...state,
        notification: { show: false }
      }

    default:
      return state
  }
}
