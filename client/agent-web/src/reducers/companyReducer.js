import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {
  REQUEST_COMPANY_SUCCESS,
  REQUEST_COMPANY_FAIL,
  OPEN_DELETE_COMPANY_MODAL,
  CLOSE_DELETE_COMPANY_MODAL,
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL,
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
  HIDE_COMPANY_NOTIFICATION
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
      return { ...state, companies: mapKeys(action.payload, '_id') }

    case REQUEST_COMPANY_SUCCESS:
      return {
        ...state,
        showRequestCompanyModal: false,
        notification: {
          show: true,
          type: 'success',
          message: action.payload.message
        }
      }

    case REQUEST_COMPANY_FAIL:
      return {
        ...state,
        showRequestCompanyModal: false,
        notification: {
          show: true,
          type: 'danger',
          message: action.payload
        }
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: omit(state.companies, action.payload._id),
        showDeleteCompanyModal: false,
        notification: {
          show: true,
          type: 'success',
          message: action.payload.data.message
        }
      }

    case HIDE_COMPANY_NOTIFICATION:
      return {
        ...state,
        notification: { show: false }
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
