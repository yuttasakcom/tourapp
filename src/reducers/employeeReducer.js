import _ from 'lodash'

const initialState = {
  employees: {},
  selectedEmployee: null,
  showAddEmployeeModal: false,
  showEditEmployeeModal: false,
  notification: { show: false, type: null, message: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
