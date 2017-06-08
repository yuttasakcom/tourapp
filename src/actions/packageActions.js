import axios from './axios'
import { FETCH_PACKAGES_SUCCESS } from './types'

export const fetchPackages = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies/pkgs')
    console.log(data)
    dispatch({ type: FETCH_PACKAGES_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}
