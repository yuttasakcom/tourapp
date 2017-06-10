import _ from 'lodash'
import axios from './axios'
import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  DELETE_PKG_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_EDIT_PKG_MODAL,
  CLOSE_EDIT_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL,
  HIDE_PKG_NOTIFICATION
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
    dispatch({ type: ADD_PKG_SUCCESS, payload: data })
    _.delay(() => dispatch({ type: HIDE_PKG_NOTIFICATION }), 4000)
  } catch (e) {
    console.error(e)
  }
}

export const deletePkg = ({ _id }) => async dispatch => {
  try {
    const { data } = await axios.delete(`/companies/pkgs/${_id}`)
    dispatch({ type: DELETE_PKG_SUCCESS, payload: { _id, data } })
    _.delay(() => dispatch({ type: HIDE_PKG_NOTIFICATION }), 4000)
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

export const openEditPkgModal = () => {
  return { type: OPEN_EDIT_PKG_MODAL }
}

export const closeEditPkgModal = () => {
  return { type: CLOSE_EDIT_PKG_MODAL }
}

export const openDeletePkgModal = _id => {
  return { type: OPEN_DELETE_PKG_MODAL, payload: _id }
}

export const closeDeletePkgModal = () => {
  return { type: CLOSE_DELETE_PKG_MODAL }
}
