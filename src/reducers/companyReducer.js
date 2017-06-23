import {
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL
} from '../actions/types'

const initialState = {
  showRequestCompanyModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: true }

    case CLOSE_REQUEST_COMPANY_MODAL:
      return { ...state, showRequestCompanyModal: false }

    default:
      return state
  }
}
