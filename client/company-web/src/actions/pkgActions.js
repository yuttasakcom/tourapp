import { success } from 'react-notification-system-redux'
import axios from './axios'
import {
  FETCH_PKGS_SUCCESS,
  ADD_PKG_SUCCESS,
  EDIT_PKG_SUCCESS,
  DELETE_PKG_SUCCESS,
  OPEN_ADD_PKG_MODAL,
  CLOSE_ADD_PKG_MODAL,
  OPEN_EDIT_PKG_MODAL,
  CLOSE_EDIT_PKG_MODAL,
  OPEN_DELETE_PKG_MODAL,
  CLOSE_DELETE_PKG_MODAL
} from './types'

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/pkgs')
    dispatch({ type: FETCH_PKGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addPkg = values => async dispatch => {
  try {
    const { data } = await axios.post('/pkgs', values)
    dispatch({ type: ADD_PKG_SUCCESS, payload: data })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: 'เพิ่มแพ็คเกจเรียบร้อยแล้ว!'
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export const editPkg = ({ _id }, values) => async dispatch => {
  try {
    const { data } = await axios.put(`/pkgs/${_id}`, values)
    dispatch({ type: EDIT_PKG_SUCCESS, payload: data })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: 'แก้ไขแพ็คเกจเรียบร้อยแล้ว!'
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export const deletePkg = ({ _id }) => async dispatch => {
  try {
    const { data: { message } } = await axios.delete(`/pkgs/${_id}`)
    dispatch({ type: DELETE_PKG_SUCCESS, payload: _id })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
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

export const openEditPkgModal = _id => {
  return { type: OPEN_EDIT_PKG_MODAL, payload: _id }
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
