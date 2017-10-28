const def = action => `AGENT/EMPLOYEE/${action}`
export const FETCH_EMPLOYEES = def('FETCH_EMPLOYEES')
export const FETCH_EMPLOYEES_SUCCESS = def('FETCH_EMPLOYEES_SUCCESS')
export const SELECT_EMPLOYEE = def('SELECT_EMPLOYEE')
