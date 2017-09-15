import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  COMPANY_FETCH_AGENTS_SUCCESS,
  COMPANY_REQUEST_AGENT_SUCCESS,
  COMPANY_OPEN_REQUEST_AGENT_MODAL,
  COMPANY_CLOSE_REQUEST_AGENT_MODAL,
  COMPANY_OPEN_DELETE_AGENT_MODAL,
  COMPANY_CLOSE_DELETE_AGENT_MODAL,
  COMPANY_DELETE_AGENT_SUCCESS,
  COMPANY_OPEN_CONTRACT_RATE_MODAL,
  COMPANY_CLOSE_CONTRACT_RATE_MODAL,
  COMPANY_OPEN_OFFER_SPECIAL_PRICE_MODAL,
  COMPANY_CLOSE_OFFER_SPECIAL_PRICE_MODAL,
  COMPANY_FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  COMPANY_OFFER_SPECIAL_PRICE_SUCCESS,
  COMPANY_OPEN_RESET_PRICE_MODAL,
  COMPANY_CLOSE_RESET_PRICE_MODAL,
  COMPANY_RESET_PRICE_SUCCESS
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
    case COMPANY_FETCH_AGENTS_SUCCESS:
      return { ...state, agents: mapKeys(action.payload, '_id') }

    case COMPANY_FETCH_AGENT_CONTRACT_RATES_SUCCESS:
      return {
        ...state,
        selectedAgentContractRates: mapKeys(action.payload, '_id')
      }

    case COMPANY_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        showRequestAgentModal: false
      }

    case COMPANY_DELETE_AGENT_SUCCESS:
      return {
        ...state,
        agents: omit(state.agents, action.payload),
        showDeleteAgentModal: false
      }

    case COMPANY_OFFER_SPECIAL_PRICE_SUCCESS:
      return {
        ...state,
        selectedAgentContractRates: {
          ...state.selectedAgentContractRates,
          [action.payload._id]: action.payload.values
        },
        showOfferSpecialPriceModal: false
      }

    case COMPANY_RESET_PRICE_SUCCESS:
      return {
        ...state,
        showResetPriceModal: false
      }

    case COMPANY_OPEN_REQUEST_AGENT_MODAL:
      return { ...state, showRequestAgentModal: true }

    case COMPANY_CLOSE_REQUEST_AGENT_MODAL:
      return { ...state, showRequestAgentModal: false }

    case COMPANY_OPEN_DELETE_AGENT_MODAL:
      return {
        ...state,
        showDeleteAgentModal: true,
        selectedAgent: action.payload
      }

    case COMPANY_CLOSE_DELETE_AGENT_MODAL:
      return { ...state, showDeleteAgentModal: false }

    case COMPANY_OPEN_CONTRACT_RATE_MODAL:
      return {
        ...state,
        showContractRateModal: true,
        selectedAgent: action.payload
      }

    case COMPANY_CLOSE_CONTRACT_RATE_MODAL:
      return { ...state, showContractRateModal: false }

    case COMPANY_OPEN_OFFER_SPECIAL_PRICE_MODAL:
      return {
        ...state,
        showOfferSpecialPriceModal: true,
        selectedOfferSpecialPricePkg: action.payload
      }

    case COMPANY_CLOSE_OFFER_SPECIAL_PRICE_MODAL:
      return { ...state, showOfferSpecialPriceModal: false }

    case COMPANY_OPEN_RESET_PRICE_MODAL:
      return {
        ...state,
        showResetPriceModal: true,
        selectedOfferSpecialPricePkg: action.payload
      }

    case COMPANY_CLOSE_RESET_PRICE_MODAL:
      return { ...state, showResetPriceModal: false }

    default:
      return state
  }
}
