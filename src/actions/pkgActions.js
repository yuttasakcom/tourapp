import axios from './axios'
import {
  FETCH_PKGS_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL
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

export const deletePkg = pkg => async dispatch => {
  try {
    const { data } = await axios.delete(`/companies/pkgs/${pkg._id}`)
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

export const openDeletePkgModal = () => {
  return { type: OPEN_DELETE_PKG_MODAL }
}

export const closeDeletePkgModal = () => {
  return { type: CLOSE_DELETE_PKG_MODAL }
}
