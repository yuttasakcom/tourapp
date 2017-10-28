import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { handleActions } from 'redux-actions'

import * as bookingStatus from '../../../utils/bookingStatus'
import {
  SELECT_ACCEPT_PENDING,
  FETCH_ACCEPT_PENDINGS_SUCCESS,
  FETCH_NOTIFICATIONS_SUCCESS,
  ADD_NOTIFICATION_SUCCESS,
  FETCH_REQUEST_PENDINGS_SUCCESS,
  ACCEPT_COMPANY_SUCCESS,
  CANCEL_REQUEST_COMPANY_SUCCESS,
  REJECT_REQUEST_COMPANY_SUCCESS
} from './types'

const initialState = {
  requestPendings: {},
  acceptPendings: {},
  selectedAcceptPending: null,
  notifications: []
}

export default handleActions(
  {
    [SELECT_ACCEPT_PENDING]: (state, action) => ({
      ...state,
      selectedAcceptPending: action.payload
    }),
    [ACCEPT_COMPANY_SUCCESS]: (state, action) => ({
      ...state,
      acceptPendings: omit(state.acceptPendings, action.payload)
    }),
    [CANCEL_REQUEST_COMPANY_SUCCESS]: (state, action) => ({
      ...state,
      requestPendings: omit(state.requestPendings, action.payload)
    }),
    [REJECT_REQUEST_COMPANY_SUCCESS]: (state, action) => ({
      ...state,
      acceptPendings: omit(state.acceptPendings, action.payload)
    }),
    [FETCH_REQUEST_PENDINGS_SUCCESS]: (state, action) => ({
      ...state,
      requestPendings: mapKeys(action.payload, '_id')
    }),
    [FETCH_ACCEPT_PENDINGS_SUCCESS]: (state, action) => ({
      ...state,
      acceptPendings: mapKeys(action.payload, '_id')
    }),
    [FETCH_NOTIFICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      notifications: action.payload
    }),
    [ADD_NOTIFICATION_SUCCESS]: (state, action) => {
      const bookingStatusKeys = Object.keys(bookingStatus)
      return {
        ...state,
        notifications: [
          ...state.notifications,
          `Pkg: ${action.payload.pkg.name} Company: ${action.payload.company
            .name} Update status from: ${bookingStatusKeys[
            action.payload.status
          ]} to: ${bookingStatusKeys[action.payload.updatedStatus]}`
        ]
      }
    }
  },
  initialState
)
