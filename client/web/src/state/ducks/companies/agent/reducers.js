import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { handleActions } from 'redux-actions'

import {
  FETCH_AGENTS_SUCCESS,
  SELECT_AGENT,
  FETCH_AGENT_CONTRACT_RATES_SUCCESS,
  SELECT_OFFER_SPECIAL_PRICE_PKG,
  OFFER_SPECIAL_PRICE_SUCCESS,
  DELETE_AGENT_SUCCESS
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
    }),

    [OFFER_SPECIAL_PRICE_SUCCESS]: (state, action) => ({
      ...state,
      selectedAgentContractRates: {
        ...state.selectedAgentContractRates,
        [action.payload.id]: action.payload.values
      }
    }),

    [DELETE_AGENT_SUCCESS]: (state, action) => ({
      ...state,
      agents: omit(state.agents, action.payload)
    })
  },
  initialState
)
