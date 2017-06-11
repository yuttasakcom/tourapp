import _ from 'lodash'
import {
  FETCH_AGENTS_SUCCESS,
  REQUEST_AGENT_SUCCESS,
  REQUEST_AGENT_FAIL,
  OPEN_REQUEST_AGENT_MODAL,
  CLOSE_REQUEST_AGENT_MODAL,
  OPEN_DELETE_AGENT_MODAL,
  CLOSE_DELETE_AGENT_MODAL,
  DELETE_AGENT_SUCCESS,
  HIDE_AGENT_NOTIFICATION
} from '../actions/types'

const initialState = {
  agents: {},
  selectedAgent: null,
  showRequestAgentModal: false,
  showDeleteAgentModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENTS_SUCCESS:
      return { ...state, agents: _.mapKeys(action.payload, '_id') }

    case REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        showRequestAgentModal: false,
        notification: {
          show: true,
          type: 'success',
          message: action.payload
        }
      }

    case DELETE_AGENT_SUCCESS:
      return {
        ...state,
        agents: _.omit(state.agents, action.payload._id),
        showDeleteAgentModal: false,
        notification: {
          show: true,
          type: 'success',
          message: action.payload.data.message
        }
      }

    case HIDE_AGENT_NOTIFICATION:
      return {
        ...state,
        notification: { show: false }
      }

    case REQUEST_AGENT_FAIL:
      return {
        ...state,
        showRequestAgentModal: false,
        notification: {
          show: true,
          type: action.payload.type,
          message: action.payload.message
        }
      }

    case OPEN_REQUEST_AGENT_MODAL:
      return { ...state, showRequestAgentModal: true }

    case CLOSE_REQUEST_AGENT_MODAL:
      return { ...state, showRequestAgentModal: false }

    case OPEN_DELETE_AGENT_MODAL:
      return {
        ...state,
        showDeleteAgentModal: true,
        selectedAgent: action.payload
      }

    case CLOSE_DELETE_AGENT_MODAL:
      return { ...state, showDeleteAgentModal: false }

    default:
      return state
  }
}
