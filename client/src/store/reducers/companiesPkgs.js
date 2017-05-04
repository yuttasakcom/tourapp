import * as ActionTypes from '../actionTypes'

const initialState = { pkgs: [], status: 'inited' }

export const pkgs = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COMPANIES_PKGS:
      return {
        pkgs: [],
        status: 'loading...',
      }

    case ActionTypes.GET_COMPANIES_PKGS_SUCCESS:
      return {
        pkgs: action.payload,
        status: 'done',
      }

    default:
      return state
  }
}
