import axios from './axios'
import { COMPANY_FETCH_DASHBOARD_SUCCESS } from './types'

export const fetchDashboard = () => async dispatch => {
  try {
    const { data } = await axios.get('/dashboard')
    dispatch({
      type: COMPANY_FETCH_DASHBOARD_SUCCESS,
      payload: data
    })
  } catch (e) {
    console.error(e)
  }
}
