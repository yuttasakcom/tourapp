import _ from 'lodash'
import axios from './axios'
import { FETCH_EMPLOYEES_SUCCESS } from './types'

export const fetchEmployees = () => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: [{
      name: "name",
      phoneNumber: 1234,
      email: "paiboon@gmail.com",
      password: "1234"
    }]
  }
}