import axios from './axios'
import {
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL,
  FETCH_COMPANIES_SUCCESS
} from './types'

export const fetchCompanies = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies')
    dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const openRequestCompanyModal = () => {
  return { type: OPEN_REQUEST_COMPANY_MODAL }
}

export const closeRequestCompanyModal = () => {
  return { type: CLOSE_REQUEST_COMPANY_MODAL }
}
