import axios from './axios'
import { FETCH_PACKAGES_SUCCESS } from './types'

export const fetchPackages = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies/pkgs')
    dispatch({ type: FETCH_PACKAGES_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addPackage = pkg => async dispatch => {
  try {
    const { data } = await axios.post('/companies/pkgs', pkg)
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}
