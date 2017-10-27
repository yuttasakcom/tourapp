import mapKeys from 'lodash/mapKeys'
import { handleActions } from 'redux-actions'

import { FETCH_AGENTS_SUCCESS, SELECT_AGENT } from './types'

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

    [SELECT_AGENT]: (state, action) => ({
      ...state,
      selectedAgent: action.payload
    })
  },
  initialState
)
