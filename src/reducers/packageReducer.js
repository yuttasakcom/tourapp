import { FETCH_PACKAGES_SUCCESS } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PACKAGES_SUCCESS:
      return action.payload

    default:
      return state
  }
}
