import _ from 'lodash'
import {
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL,
  FETCH_COMPANIES_SUCCESS
} from '../actions/types'

const initialState = {
  companies: {},
  showRequestCompanyModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return { ...state, companies: _.mapKeys(action.payload, '_id') }

    case OPEN_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: true }

    case CLOSE_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: false }

    default:
      return state
  }
}
