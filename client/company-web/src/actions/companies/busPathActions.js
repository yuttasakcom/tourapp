import { success, error } from 'react-notification-system-redux'
import axios from './axios'
import {
  COMPANY_FETCH_BUS_PATHS_SUCCESS,
  COMPANY_FETCH_BUS_PATH_HOTELS_SUCCESS,
  COMPANY_ADD_BUS_PATH_SUCCESS,
  COMPANY_EDIT_BUS_PATH_SUCCESS,
  COMPANY_DELETE_BUS_PATH_SUCCESS,
  COMPANY_OPEN_BUS_PATHS_MODAL,
  COMPANY_CLOSE_BUS_PATHS_MODAL,
  COMPANY_OPEN_ADD_BUS_PATH_MODAL,
  COMPANY_CLOSE_ADD_BUS_PATH_MODAL,
  COMPANY_OPEN_EDIT_BUS_PATH_MODAL,
  COMPANY_CLOSE_EDIT_BUS_PATH_MODAL,
  COMPANY_OPEN_DELETE_BUS_PATH_MODAL,
  COMPANY_CLOSE_DELETE_BUS_PATH_MODAL
} from './types'

export const fetchBusPathHotels = (busPathId = '') => async (
  dispatch,
  getState
) => {
  const { busPath: { selectedPkg } } = getState()
  try {
    const { data } = await axios.get(
      `/bus-path-hotels/${busPathId}?pkgId=${selectedPkg}`
    )
    dispatch({ type: COMPANY_FETCH_BUS_PATH_HOTELS_SUCCESS, payload: data })
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.message
      })
    )
  }
}

export const fetchBusPaths = pkgId => async dispatch => {
  try {
    const { data } = await axios.get(`/bus-paths?pkgId=${pkgId}`)
    dispatch({ type: COMPANY_FETCH_BUS_PATHS_SUCCESS, payload: data })
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.message
      })
    )
  }
}

export const addBusPath = values => async dispatch => {
  try {
    const { data } = await axios.post('/bus-paths', values)
    dispatch({ type: COMPANY_ADD_BUS_PATH_SUCCESS, payload: data })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: 'เพิ่มเส้นทางเรียบร้อยแล้ว!'
      })
    )
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data.error
      })
    )
  }
}

export const editBusPath = ({ _id }, values) => async dispatch => {
  try {
    const { data } = await axios.put(`/bus-paths/${_id}`, values)
    dispatch({ type: COMPANY_EDIT_BUS_PATH_SUCCESS, payload: data })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message: 'แก้ไขเส้นทางเรียบร้อยแล้ว!'
      })
    )
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.message
      })
    )
  }
}

export const deleteBusPath = ({ _id }) => async dispatch => {
  try {
    const { data: { message } } = await axios.delete(`/bus-paths/${_id}`)
    dispatch({ type: COMPANY_DELETE_BUS_PATH_SUCCESS, payload: _id })
    dispatch(
      success({
        title: 'แจ้งเตือน',
        message
      })
    )
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.message
      })
    )
  }
}

export const openBusPathsModal = _id => ({
  type: COMPANY_OPEN_BUS_PATHS_MODAL,
  payload: _id
})

export const closeBusPathsModal = () => ({
  type: COMPANY_CLOSE_BUS_PATHS_MODAL
})

export const openAddBusPathModal = () => ({
  type: COMPANY_OPEN_ADD_BUS_PATH_MODAL
})

export const closeAddBusPathModal = () => ({
  type: COMPANY_CLOSE_ADD_BUS_PATH_MODAL
})

export const openEditBusPathModal = _id => ({
  type: COMPANY_OPEN_EDIT_BUS_PATH_MODAL,
  payload: _id
})

export const closeEditBusPathModal = () => ({
  type: COMPANY_CLOSE_EDIT_BUS_PATH_MODAL
})

export const openDeleteBusPathModal = _id => ({
  type: COMPANY_OPEN_DELETE_BUS_PATH_MODAL,
  payload: _id
})

export const closeDeleteBusPathModal = () => ({
  type: COMPANY_CLOSE_DELETE_BUS_PATH_MODAL
})
