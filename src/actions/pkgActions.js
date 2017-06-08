import axios from './axios'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL
} from './types'

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies/pkgs')
    dispatch({ type: FETCH_PKGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addPkg = pkg => async dispatch => {
  try {
    const { data } = await axios.post('/companies/pkgs', pkg)
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}

export const openAddPkgModal = () => {
  return { type: OPEN_ADD_PKG_MODAL }
}

export const closeAddPkgModal = () => {
  return { type: CLOSE_ADD_PKG_MODAL }
}
