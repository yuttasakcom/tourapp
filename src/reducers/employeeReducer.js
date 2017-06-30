import _ from 'lodash'
import {
  FETCH_EMPLOYEES_SUCCESS,
  OPEN_ADD_EMPLOYEE_MODAL,
  CLOSE_ADD_EMPLOYEE_MODAL,
  OPEN_EDIT_EMPLOYEE_MODAL,
  CLOSE_EDIT_EMPLOYEE_MODAL
} from '../actions/types'

const initialState = {
  employees: {},
  selectedEmployee: null,
  showAddEmployeeModal: false,
  showEditEmployeeModal: false,
  showDeleteEmployeeModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, employees: _.mapKeys(action.payload, '_id') }

    case OPEN_ADD_EMPLOYEE_MODAL:
      return { ...state, showAddEmployeeModal: true }

    case CLOSE_ADD_EMPLOYEE_MODAL:
      return { ...state, showAddEmployeeModal: false }

    case OPEN_EDIT_EMPLOYEE_MODAL:
      return {
        ...state,
        showEditEmployeeModal: true,
        selectedEmployee: action.payload
      }

    case CLOSE_EDIT_EMPLOYEE_MODAL:
      return { ...state, showEditEmployeeModal: false }

    default:
      return state
  }
}
