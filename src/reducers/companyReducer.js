import _ from 'lodash'
import {
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
  showDeleteCompanyModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return { ...state, companies: _.mapKeys(action.payload, '_id') }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: _.omit(state.companies, action.payload._id),
        showDeleteCompanyModal: false,
        notification: {
          show: true,
          type: 'success',
          message: action.payload.data.message
        }
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
