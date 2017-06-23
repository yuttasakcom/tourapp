import {
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL
} from './types'

export const openRequestCompanyModal = () => {
  return { type: OPEN_REQUEST_COMPANY_MODAL }
}

export const closeRequestCompanyModal = () => {
  return { type: CLOSE_REQUEST_COMPANY_MODAL }
}
