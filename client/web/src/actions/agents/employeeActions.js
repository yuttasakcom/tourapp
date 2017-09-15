// import _ from 'lodash'
// import axios from './axios'
import {
  AGENT_FETCH_EMPLOYEES_SUCCESS,
  AGENT_OPEN_ADD_EMPLOYEE_MODAL,
  AGENT_CLOSE_ADD_EMPLOYEE_MODAL,
  AGENT_OPEN_EDIT_EMPLOYEE_MODAL,
  AGENT_CLOSE_EDIT_EMPLOYEE_MODAL,
  AGENT_OPEN_DELETE_EMPLOYEE_MODAL,
  AGENT_CLOSE_DELETE_EMPLOYEE_MODAL
} from './types'

export const fetchEmployees = () => {
  return {
    type: AGENT_FETCH_EMPLOYEES_SUCCESS,
    payload: [
      {
        _id: '1',
        name: 'name',
        phoneNumber: 1234,
        email: 'paiboon@gmail.com',
        password: '1234'
      }
    ]
  }
}

export const addEmployee = () => {
  return {
    type: 'stub'
  }
}
export const editEmployee = () => {
  return {
    type: 'stub'
  }
}
export const deleteEmployee = () => {
  return {
    type: 'stub'
  }
}

export const openAddEmployeeModal = () => {
  return { type: AGENT_OPEN_ADD_EMPLOYEE_MODAL }
}

export const closeAddEmployeeModal = () => {
  return { type: AGENT_CLOSE_ADD_EMPLOYEE_MODAL }
}

export const openEditEmployeeModal = _id => {
  return { type: AGENT_OPEN_EDIT_EMPLOYEE_MODAL, payload: _id }
}

export const closeEditEmployeeModal = () => {
  return { type: AGENT_CLOSE_EDIT_EMPLOYEE_MODAL }
}

export const openDeleteEmployeeModal = _id => {
  return { type: AGENT_OPEN_DELETE_EMPLOYEE_MODAL, payload: _id }
}

export const closeDeleteEmployeeModal = () => {
  return { type: AGENT_CLOSE_DELETE_EMPLOYEE_MODAL }
}
