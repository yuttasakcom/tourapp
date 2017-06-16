import _ from 'lodash'
import axios from './axios'
import {
  FETCH_AGENTS_SUCCESS,
  REQUEST_AGENT_SUCCESS,
  REQUEST_AGENT_FAIL,
  DELETE_AGENT_SUCCESS,
  OPEN_REQUEST_AGENT_MODAL,
  CLOSE_REQUEST_AGENT_MODAL,
  OPEN_DELETE_AGENT_MODAL,
  CLOSE_DELETE_AGENT_MODAL,
  HIDE_AGENT_NOTIFICATION,
  OPEN_CONTRACT_RATE_MODAL,
  CLOSE_CONTRACT_RATE_MODAL,
  OPEN_OFFER_SPECIAL_PRICE_MODAL,
  CLOSE_OFFER_SPECIAL_PRICE_MODAL,
  FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  OFFER_SPECIAL_PRICE_SUCCESS,
  RESET_PRICE_SUCCESS,
  OPEN_RESET_PRICE_MODAL,
  CLOSE_RESET_PRICE_MODAL
} from './types'

export const fetchAgents = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies/agents')
    dispatch({ type: FETCH_AGENTS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const fetchAgentContractRates = ({ _id }) => async dispatch => {
  try {
    const { data } = await axios.get(`/companies/special-prices/${_id}`)
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
    const { data } = await axios.post(`/companies/pkgs/${_id}/special-prices`, {
      agent: agentId,
      ...values
    })
    dispatch({
      type: OFFER_SPECIAL_PRICE_SUCCESS,
      payload: { _id, values, ...data }
    })
    _.delay(() => dispatch({ type: HIDE_AGENT_NOTIFICATION }), 4000)
  } catch (e) {
    console.error(e)
  }
}

export const resetPrice = (agentId, { _id }) => async dispatch => {
  try {
    const { data } = await axios.delete(
      `/companies/pkgs/${_id}/special-prices/${agentId}`
    )
    dispatch({ type: RESET_PRICE_SUCCESS, payload: data })
    _.delay(() => dispatch({ type: HIDE_AGENT_NOTIFICATION }), 4000)
  } catch (e) {
    console.error(e)
  }
}

export const requestAgent = values => async dispatch => {
  try {
    const { data: { message } } = await axios.post('/companies/request', values)
    dispatch({
      type: REQUEST_AGENT_SUCCESS,
      payload: { message, _id: values._id }
    })
    _.delay(() => dispatch({ type: HIDE_AGENT_NOTIFICATION }), 4000)
  } catch (e) {
    dispatch({
      type: REQUEST_AGENT_FAIL,
      payload: { type: 'danger', message: e.response.data.error }
    })
    _.delay(() => dispatch({ type: HIDE_AGENT_NOTIFICATION }), 4000)
  }
}

export const deleteAgent = ({ _id }) => async dispatch => {
  try {
    const { data } = await axios.delete(`/companies/relationship/${_id}`)
    dispatch({ type: DELETE_AGENT_SUCCESS, payload: { data, _id } })
    _.delay(() => dispatch({ type: HIDE_AGENT_NOTIFICATION }), 4000)
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
