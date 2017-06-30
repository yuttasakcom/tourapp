import _ from 'lodash'
import { FETCH_EMPLOYEES_SUCCESS } from '../actions/types'

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
      
    default:
      return state
  }
}
