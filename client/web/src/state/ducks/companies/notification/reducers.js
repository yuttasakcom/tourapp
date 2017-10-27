import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { handleActions } from 'redux-actions'

import {
  SELECT_ACCEPT_PENDING,
  FETCH_ACCEPT_PENDINGS_SUCCESS,
  FETCH_NOTIFICATIONS_SUCCESS,
  ADD_NOTIFICATION_SUCCESS,
  FETCH_REQUEST_PENDINGS_SUCCESS,
  ACCEPT_AGENT_SUCCESS,
  CANCEL_AGENT_REQUEST_SUCCESS,
  REJECT_REQUEST_AGENT_SUCCESS
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
    [ACCEPT_AGENT_SUCCESS]: (state, action) => ({
      ...state,
      acceptPendings: omit(state.acceptPendings, action.payload)
    }),
    [CANCEL_AGENT_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      requestPendings: omit(state.requestPendings, action.payload)
    }),
    [REJECT_REQUEST_AGENT_SUCCESS]: (state, action) => ({
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
    [ADD_NOTIFICATION_SUCCESS]: (state, action) => ({
      ...state,
      notifications: [
        ...state.notifications,
        `Book by ${action.payload.agent.name} package ${action.payload.pkg
          .name}`
      ]
    })
  },
  initialState
)
