import { FETCH_PKGS_SUCCESS } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return action.payload

    default:
      return state
  }
}
