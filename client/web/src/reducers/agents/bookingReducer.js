import mapKeys from 'lodash/mapKeys'
import {
  AGENT_FETCH_PKGS_SUCCESS,
  AGENT_FETCH_HOTELS_SUCCESS,
  AGENT_OPEN_ADD_BOOKING_MODAL,
  AGENT_CLOSE_ADD_BOOKING_MODAL,
  AGENT_ADD_BOOKING_SUCCESS
} from '../../actions/agents/types'

const initialState = {
  pkgs: {},
  hotels: [],
  selectedPkg: null,
  showAddBookingModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: mapKeys(action.payload, '_id') }

    case AGENT_FETCH_HOTELS_SUCCESS:
      return { ...state, hotels: action.payload }

    case AGENT_OPEN_ADD_BOOKING_MODAL:
      return {
        ...state,
        showAddBookingModal: true,
        selectedPkg: action.payload
      }

    case AGENT_ADD_BOOKING_SUCCESS:
      return {
        ...state,
        showAddBookingModal: false
      }

    case AGENT_CLOSE_ADD_BOOKING_MODAL:
      return { ...state, showAddBookingModal: false }

    default:
      return state
  }
}
