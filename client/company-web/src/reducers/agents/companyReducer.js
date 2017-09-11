import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  REQUEST_COMPANY_SUCCESS,
  OPEN_DELETE_COMPANY_MODAL,
  CLOSE_DELETE_COMPANY_MODAL,
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL,
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANIES_SUCCESS
} from '../actions/types'

const initialState = {
  companies: {},
  selectedCompany: null,
  showRequestCompanyModal: false,
  showDeleteCompanyModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return { ...state, companies: mapKeys(action.payload, '_id') }

    case REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        showRequestCompanyModal: false
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: omit(state.companies, action.payload),
        showDeleteCompanyModal: false
      }

    case OPEN_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: true }

    case CLOSE_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: false }

    case OPEN_DELETE_COMPANY_MODAL:
      return {
        ...state,
        showDeleteCompanyModal: true,
        selectedCompany: action.payload
      }

    case CLOSE_DELETE_COMPANY_MODAL:
      return { ...state, showDeleteCompanyModal: false }

    default:
      return state
  }
}
