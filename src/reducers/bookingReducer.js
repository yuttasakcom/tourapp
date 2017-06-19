import _ from 'lodash'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_BOOKING_MODAL,
  CLOSE_ADD_BOOKING_MODAL
} from '../actions/types'

const initialState = {
  pkgs: {},
  showAddBookingModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: _.mapKeys(action.payload, '_id') }

    case OPEN_ADD_BOOKING_MODAL:
      return { ...state, showAddBookingModal: true }

    case CLOSE_ADD_BOOKING_MODAL:
      return { ...state, showAddBookingModal: false }

    default:
      return state
  }
}
