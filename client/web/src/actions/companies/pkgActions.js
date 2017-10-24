import { success } from 'react-notification-system-redux'
import axios from './axios'
import {
  COMPANY_FETCH_PKGS_SUCCESS,
  COMPANY_ADD_PKG_SUCCESS,
  COMPANY_EDIT_PKG_SUCCESS,
  COMPANY_DELETE_PKG_SUCCESS,
  COMPANY_SELECT_PKG
} from './types'

export const fetchPkgs = () => async dispatch => {
  try {
    const { data } = await axios.get('/pkgs')
    dispatch({ type: COMPANY_FETCH_PKGS_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const addPkg = values => async dispatch => {
  try {
    const { data } = await axios.post('/pkgs', values)
    dispatch({ type: COMPANY_ADD_PKG_SUCCESS, payload: data })
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
    dispatch({ type: COMPANY_EDIT_PKG_SUCCESS, payload: data })
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
    dispatch({ type: COMPANY_DELETE_PKG_SUCCESS, payload: _id })
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

export const selectPkg = _id => {
  return { type: COMPANY_SELECT_PKG, payload: _id }
}
