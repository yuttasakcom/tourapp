import _ from 'lodash'
import axios from './axios'
import {
  FETCH_EMPLOYEES_SUCCESS,
  OPEN_ADD_EMPLOYEE_MODAL,
  CLOSE_ADD_EMPLOYEE_MODAL
} from './types'

export const fetchEmployees = () => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
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

export const openAddEmployeeModal = () => {
  return { type: OPEN_ADD_EMPLOYEE_MODAL }
}

export const closeAddEmployeeModal = () => {
  return { type: CLOSE_ADD_EMPLOYEE_MODAL }
}
