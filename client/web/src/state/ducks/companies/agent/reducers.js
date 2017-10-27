import mapKeys from 'lodash/mapKeys'
import { handleActions } from 'redux-actions'

import {
  FETCH_AGENTS_SUCCESS,
  SELECT_AGENT,
  FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  SELECT_OFFER_SPECIAL_PRICE_PKG
} from './types'

const initialState = {
  agents: {},
  selectedAgent: null,
  selectedAgentContractRates: {},
  selectedOfferSpecialPricePkg: null
}

export default handleActions(
  {
    [FETCH_AGENTS_SUCCESS]: (state, action) => ({
      ...state,
      agents: mapKeys(action.payload, '_id')
    }),

    [FETCH_AGENT_CONTRACT_RATES_SUCCESS]: (state, action) => ({
      ...state,
      selectedAgentContractRates: mapKeys(action.payload, '_id')
    }),

    [SELECT_AGENT]: (state, action) => ({
      ...state,
      selectedAgent: action.payload
    }),

    [SELECT_OFFER_SPECIAL_PRICE_PKG]: (state, action) => ({
      ...state,
      selectedOfferSpecialPricePkg: action.payload
    })
  },
  initialState
)
