import { success, error } from 'react-notification-system-redux'

import axios from './axios'
import socket from './socket'
import {
  OPEN_DELETE_COMPANY_MODAL,
  CLOSE_DELETE_COMPANY_MODAL,
  OPEN_REQUEST_COMPANY_MODAL,
  CLOSE_REQUEST_COMPANY_MODAL,
  FETCH_COMPANIES_SUCCESS,
  ACCEPT_COMPANY_SUCCESS,
  REJECT_REQUEST_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  REQUEST_COMPANY_SUCCESS,
  CANCEL_REQUEST_COMPANY_SUCCESS
} from './types'

export const fetchCompanies = () => async dispatch => {
  try {
    const { data } = await axios.get('/companies')
    dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const requestCompany = ({ _id }, callback) => async dispatch => {
  try {
    const { data: { message } } = await axios.post('/request', { _id })
    dispatch({
      type: REQUEST_COMPANY_SUCCESS
    })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
    socket.emit('request', { _id })
    callback()
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data.error
      })
    )
  }
}

export const cancelRequestCompany = ({ _id }) => async dispatch => {
  try {
    await axios.delete(`/cancel-request/${_id}`)
    dispatch({ type: CANCEL_REQUEST_COMPANY_SUCCESS, payload: _id })
    socket.emit('cancelRequest', { _id })
  } catch (e) {
    console.erroe(e)
  }
}

export const deleteCompany = ({ _id }) => async dispatch => {
  try {
    const { data: { message } } = await axios.delete(`/relationship/${_id}`)
    dispatch({ type: DELETE_COMPANY_SUCCESS, payload: _id })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: message
      })
    )
    socket.emit('deleteRelationship', { _id })
  } catch (e) {
    console.error(e)
  }
}

export const acceptCompany = (_id, callback) => async dispatch => {
  try {
    await axios.post('/accept', { _id })
    dispatch({
      type: ACCEPT_COMPANY_SUCCESS,
      payload: _id
    })
    socket.emit('accept', { _id })
    callback()
  } catch (e) {
    console.error(e)
  }
}

export const rejectRequestCompany = _id => async dispatch => {
  try {
    await axios.delete(`/reject-request/${_id}`)
    dispatch({
      type: REJECT_REQUEST_COMPANY_SUCCESS,
      payload: _id
    })
    socket.emit('rejectRequest', { _id })
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

export const openDeleteCompanyModal = _id => {
  return { type: OPEN_DELETE_COMPANY_MODAL, payload: _id }
}

export const closeDeleteCompanyModal = () => {
  return { type: CLOSE_DELETE_COMPANY_MODAL }
}
