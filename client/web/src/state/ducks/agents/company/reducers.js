import { handleActions } from 'redux-actions'
import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'

import {
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
  SELECT_COMPANY
} from './types'

const initialState = {
  companies: {},
  selectedCompany: null
}

export default handleActions(
  {
    [FETCH_COMPANIES_SUCCESS]: (state, action) => ({
      ...state,
      companies: mapKeys(action.payload, '_id')
    }),

    [DELETE_COMPANY_SUCCESS]: (state, action) => ({
      ...state,
      companies: omit(state.companies, action.payload)
    }),

    [SELECT_COMPANY]: (state, action) => ({
      ...state,
      selectedCompany: action.payload
    })
  },
  initialState
)
