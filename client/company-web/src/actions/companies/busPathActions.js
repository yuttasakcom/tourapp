import { success, error } from 'react-notification-system-redux'
import axios from './axios'
import {
  FETCH_BUS_PATHS_SUCCESS,
  FETCH_BUS_PATH_HOTELS_SUCCESS,
  ADD_BUS_PATH_SUCCESS,
  EDIT_BUS_PATH_SUCCESS,
  DELETE_BUS_PATH_SUCCESS,
  OPEN_BUS_PATHS_MODAL,
  CLOSE_BUS_PATHS_MODAL,
  OPEN_ADD_BUS_PATH_MODAL,
  CLOSE_ADD_BUS_PATH_MODAL,
  OPEN_EDIT_BUS_PATH_MODAL,
  CLOSE_EDIT_BUS_PATH_MODAL,
  OPEN_DELETE_BUS_PATH_MODAL,
  CLOSE_DELETE_BUS_PATH_MODAL
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
    dispatch({ type: FETCH_BUS_PATH_HOTELS_SUCCESS, payload: data })
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
    dispatch({ type: FETCH_BUS_PATHS_SUCCESS, payload: data })
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
    dispatch({ type: ADD_BUS_PATH_SUCCESS, payload: data })
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
    dispatch({ type: EDIT_BUS_PATH_SUCCESS, payload: data })
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
    dispatch({ type: DELETE_BUS_PATH_SUCCESS, payload: _id })
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
  type: OPEN_BUS_PATHS_MODAL,
  payload: _id
})

export const closeBusPathsModal = () => ({ type: CLOSE_BUS_PATHS_MODAL })

export const openAddBusPathModal = () => ({ type: OPEN_ADD_BUS_PATH_MODAL })

export const closeAddBusPathModal = () => ({ type: CLOSE_ADD_BUS_PATH_MODAL })

export const openEditBusPathModal = _id => ({
  type: OPEN_EDIT_BUS_PATH_MODAL,
  payload: _id
})

export const closeEditBusPathModal = () => ({ type: CLOSE_EDIT_BUS_PATH_MODAL })

export const openDeleteBusPathModal = _id => ({
  type: OPEN_DELETE_BUS_PATH_MODAL,
  payload: _id
})

export const closeDeleteBusPathModal = () => ({
  type: CLOSE_DELETE_BUS_PATH_MODAL
})
