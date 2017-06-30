import _ from 'lodash'
import {
  FETCH_EMPLOYEES_SUCCESS,
  OPEN_ADD_EMPLOYEE_MODAL,
  CLOSE_ADD_EMPLOYEE_MODAL
} from '../actions/types'

const initialState = {
  employees: {},
  selectedEmployee: null,
  showAddEmployeeModal: false,
  showEditEmployeeModal: false,
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

    default:
      return state
  }
}
