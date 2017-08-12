import { success, error } from 'react-notification-system-redux'
import axios from './axios'
import socket from './socket'
import {
  FETCH_AGENTS_SUCCESS,
  REQUEST_AGENT_SUCCESS,
  CANCEL_REQUEST_AGENT_SUCCESS,
  REJECT_REQUEST_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  OPEN_REQUEST_AGENT_MODAL,
  CLOSE_REQUEST_AGENT_MODAL,
  OPEN_DELETE_AGENT_MODAL,
  CLOSE_DELETE_AGENT_MODAL,
  OPEN_CONTRACT_RATE_MODAL,
  CLOSE_CONTRACT_RATE_MODAL,
  OPEN_OFFER_SPECIAL_PRICE_MODAL,
  CLOSE_OFFER_SPECIAL_PRICE_MODAL,
  FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  OFFER_SPECIAL_PRICE_SUCCESS,
  RESET_PRICE_SUCCESS,
  OPEN_RESET_PRICE_MODAL,
  CLOSE_RESET_PRICE_MODAL,
  ACCEPT_AGENT_SUCCESS
} from './types'

export const fetchAgents = () => async dispatch => {
  try {
    const { data } = await axios.get('/agents')
    dispatch({ type: FETCH_AGENTS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const acceptAgent = (_id, callback) => async dispatch => {
  try {
    await axios.post('/accept', { _id })
    dispatch({
      type: ACCEPT_AGENT_SUCCESS,
      payload: _id
    })
    socket.emit('accept', { _id })
    callback()
  } catch (e) {
    console.error(e)
  }
}

export const rejectRequestAgent = _id => async dispatch => {
  try {
    await axios.delete(`/reject-request/${_id}`)
    dispatch({
      type: REJECT_REQUEST_AGENT_SUCCESS,
      payload: _id
    })
    socket.emit('rejectRequest', { _id })
  } catch (e) {
    console.error(e)
  }
}

export const fetchAgentContractRates = ({ _id }) => async dispatch => {
  try {
    const { data } = await axios.get(`/special-prices/${_id}`)
    dispatch({ type: FETCH_AGENT_CONTRACT_RATES_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const offerSpecialPrice = (
  agentId,
  { _id },
  values
) => async dispatch => {
  try {
    const {
      data: { message }
    } = await axios.post(`/pkgs/${_id}/special-prices`, {
      agent: agentId,
      ...values
    })
    dispatch({
      type: OFFER_SPECIAL_PRICE_SUCCESS,
      payload: { _id, values }
    })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export const resetPrice = (agentId, { _id }, callback) => async dispatch => {
  try {
    const { data: { message } } = await axios.delete(
      `/pkgs/${_id}/special-prices/${agentId}`
    )
    dispatch({ type: RESET_PRICE_SUCCESS })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
    callback({ _id })
  } catch (e) {
    console.error(e)
  }
}

export const requestAgent = ({ _id }, callback) => async dispatch => {
  try {
    const { data: { message } } = await axios.post('/request', { _id })
    dispatch({ type: REQUEST_AGENT_SUCCESS })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
    socket.emit('request', { _id })
    callback()
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data.error
      })
    )
  }
}

export const cancelRequestAgent = ({ _id }) => async dispatch => {
  try {
    await axios.delete(`/cancel-request/${_id}`)
    dispatch({ type: CANCEL_REQUEST_AGENT_SUCCESS, payload: _id })
    socket.emit('cancelRequest', { _id })
  } catch (e) {
    console.error(e)
  }
}

export const deleteAgent = ({ _id }) => async dispatch => {
  try {
    const { data: { message } } = await axios.delete(`/relationship/${_id}`)
    dispatch({ type: DELETE_AGENT_SUCCESS, payload: _id })
    socket.emit('deleteRelationship', { _id })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export const openRequestAgentModal = () => {
  return { type: OPEN_REQUEST_AGENT_MODAL }
}

export const closeRequestAgentModal = () => {
  return { type: CLOSE_REQUEST_AGENT_MODAL }
}

export const openContractRateModal = _id => {
  return { type: OPEN_CONTRACT_RATE_MODAL, payload: _id }
}

export const closeContractRateModal = () => {
  return { type: CLOSE_CONTRACT_RATE_MODAL }
}

export const openOfferSpecialPriceModal = _id => {
  return { type: OPEN_OFFER_SPECIAL_PRICE_MODAL, payload: _id }
}

export const closeOfferSpecialPriceModal = () => {
  return { type: CLOSE_OFFER_SPECIAL_PRICE_MODAL }
}

export const openDeleteAgentModal = _id => {
  return { type: OPEN_DELETE_AGENT_MODAL, payload: _id }
}

export const closeDeleteAgentModal = () => {
  return { type: CLOSE_DELETE_AGENT_MODAL }
}

export const openResetPriceModal = _id => {
  return { type: OPEN_RESET_PRICE_MODAL, payload: _id }
}

export const closeResetPriceModal = () => {
  return { type: CLOSE_RESET_PRICE_MODAL }
}
