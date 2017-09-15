import mapKeys from 'lodash/mapKeys'
import {
  AGENT_FETCH_EMPLOYEES_SUCCESS,
  AGENT_OPEN_ADD_EMPLOYEE_MODAL,
  AGENT_CLOSE_ADD_EMPLOYEE_MODAL,
  AGENT_OPEN_EDIT_EMPLOYEE_MODAL,
  AGENT_CLOSE_EDIT_EMPLOYEE_MODAL,
  AGENT_OPEN_DELETE_EMPLOYEE_MODAL,
  AGENT_CLOSE_DELETE_EMPLOYEE_MODAL
} from '../../actions/agents/types'

const initialState = {
  employees: {},
  selectedEmployee: null,
  showAddEmployeeModal: false,
  showEditEmployeeModal: false,
  showDeleteEmployeeModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENT_FETCH_EMPLOYEES_SUCCESS:
      return { ...state, employees: mapKeys(action.payload, '_id') }

    case AGENT_OPEN_ADD_EMPLOYEE_MODAL:
      return { ...state, showAddEmployeeModal: true }

    case AGENT_CLOSE_ADD_EMPLOYEE_MODAL:
      return { ...state, showAddEmployeeModal: false }

    case AGENT_OPEN_EDIT_EMPLOYEE_MODAL:
      return {
        ...state,
        showEditEmployeeModal: true,
        selectedEmployee: action.payload
      }

    case AGENT_CLOSE_EDIT_EMPLOYEE_MODAL:
      return { ...state, showEditEmployeeModal: false }

    case AGENT_OPEN_DELETE_EMPLOYEE_MODAL:
      return {
        ...state,
        showDeleteEmployeeModal: true,
        selectedEmployee: action.payload
      }

    case AGENT_CLOSE_DELETE_EMPLOYEE_MODAL:
      return { ...state, showDeleteEmployeeModal: false }

    default:
      return state
  }
}
