import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  AGENT_REQUEST_COMPANY_SUCCESS,
  AGENT_OPEN_DELETE_COMPANY_MODAL,
  AGENT_CLOSE_DELETE_COMPANY_MODAL,
  AGENT_OPEN_REQUEST_COMPANY_MODAL,
  AGENT_CLOSE_REQUEST_COMPANY_MODAL,
  AGENT_DELETE_COMPANY_SUCCESS,
  AGENT_FETCH_COMPANIES_SUCCESS
} from '../../actions/agents/types'

const initialState = {
  companies: {},
  selectedCompany: null,
  showRequestCompanyModal: false,
  showDeleteCompanyModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_FETCH_COMPANIES_SUCCESS:
      return { ...state, companies: mapKeys(action.payload, '_id') }

    case AGENT_REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        showRequestCompanyModal: false
      }

    case AGENT_DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: omit(state.companies, action.payload),
        showDeleteCompanyModal: false
      }

    case AGENT_OPEN_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: true }

    case AGENT_CLOSE_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: false }

    case AGENT_OPEN_DELETE_COMPANY_MODAL:
      return {
        ...state,
        showDeleteCompanyModal: true,
        selectedCompany: action.payload
      }

    case AGENT_CLOSE_DELETE_COMPANY_MODAL:
      return { ...state, showDeleteCompanyModal: false }

    default:
      return state
  }
}
