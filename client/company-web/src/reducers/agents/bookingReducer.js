import mapKeys from 'lodash/mapKeys'
import {
  FETCH_PKGS_SUCCESS,
  FETCH_HOTELS_SUCCESS,
  OPEN_ADD_BOOKING_MODAL,
  CLOSE_ADD_BOOKING_MODAL,
  ADD_BOOKING_SUCCESS
} from '../../actions/agents/types'

const initialState = {
  pkgs: {},
  hotels: [],
  selectedPkg: null,
  showAddBookingModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: mapKeys(action.payload, '_id') }

    case FETCH_HOTELS_SUCCESS:
      return { ...state, hotels: action.payload }

    case OPEN_ADD_BOOKING_MODAL:
      return {
        ...state,
        showAddBookingModal: true,
        selectedPkg: action.payload
      }

    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        showAddBookingModal: false
      }

    case CLOSE_ADD_BOOKING_MODAL:
      return { ...state, showAddBookingModal: false }

    default:
      return state
  }
}
