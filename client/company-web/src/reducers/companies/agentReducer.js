import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  FETCH_AGENTS_SUCCESS,
  REQUEST_AGENT_SUCCESS,
  OPEN_REQUEST_AGENT_MODAL,
  CLOSE_REQUEST_AGENT_MODAL,
  OPEN_DELETE_AGENT_MODAL,
  CLOSE_DELETE_AGENT_MODAL,
  DELETE_AGENT_SUCCESS,
  OPEN_CONTRACT_RATE_MODAL,
  CLOSE_CONTRACT_RATE_MODAL,
  OPEN_OFFER_SPECIAL_PRICE_MODAL,
  CLOSE_OFFER_SPECIAL_PRICE_MODAL,
  FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  OFFER_SPECIAL_PRICE_SUCCESS,
  OPEN_RESET_PRICE_MODAL,
  CLOSE_RESET_PRICE_MODAL,
  RESET_PRICE_SUCCESS
} from '../../actions/companies/types'

const initialState = {
  agents: {},
  selectedAgent: null,
  selectedAgentContractRates: {},
  selectedOfferSpecialPricePkg: null,
  showRequestAgentModal: false,
  showContractRateModal: false,
  showOfferSpecialPriceModal: false,
  showResetPriceModal: false,
  showDeleteAgentModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENTS_SUCCESS:
      return { ...state, agents: mapKeys(action.payload, '_id') }

    case FETCH_AGENT_CONTRACT_RATES_SUCCESS:
      return {
        ...state,
        selectedAgentContractRates: mapKeys(action.payload, '_id')
      }

    case REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        showRequestAgentModal: false
      }

    case DELETE_AGENT_SUCCESS:
      return {
        ...state,
        agents: omit(state.agents, action.payload),
        showDeleteAgentModal: false
      }

    case OFFER_SPECIAL_PRICE_SUCCESS:
      return {
        ...state,
        selectedAgentContractRates: {
          ...state.selectedAgentContractRates,
          [action.payload._id]: action.payload.values
        },
        showOfferSpecialPriceModal: false
      }

    case RESET_PRICE_SUCCESS:
      return {
        ...state,
        showResetPriceModal: false
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

    case OPEN_CONTRACT_RATE_MODAL:
      return {
        ...state,
        showContractRateModal: true,
        selectedAgent: action.payload
      }

    case CLOSE_CONTRACT_RATE_MODAL:
      return { ...state, showContractRateModal: false }

    case OPEN_OFFER_SPECIAL_PRICE_MODAL:
      return {
        ...state,
        showOfferSpecialPriceModal: true,
        selectedOfferSpecialPricePkg: action.payload
      }

    case CLOSE_OFFER_SPECIAL_PRICE_MODAL:
      return { ...state, showOfferSpecialPriceModal: false }

    case OPEN_RESET_PRICE_MODAL:
      return {
        ...state,
        showResetPriceModal: true,
        selectedOfferSpecialPricePkg: action.payload
      }

    case CLOSE_RESET_PRICE_MODAL:
      return { ...state, showResetPriceModal: false }

    default:
      return state
  }
}
