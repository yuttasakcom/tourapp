import mapKeys from 'lodash/mapKeys'
import { handleActions } from 'redux-actions'

import { FETCH_EMPLOYEES_SUCCESS, SELECT_EMPLOYEE } from './types'

const initialState = {
  employees: {},
  selectedEmployee: null
}

export default handleActions(
  {
    [FETCH_EMPLOYEES_SUCCESS]: (state, action) => ({
      ...state,
      employees: mapKeys(action.payload, '_id')
    }),

    [SELECT_EMPLOYEE]: (state, action) => ({
      ...state,
      selectedEmployee: action.payload
    })
  },
  initialState
)
