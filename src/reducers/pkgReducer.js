import _ from 'lodash'
import { FETCH_PKGS_SUCCESS } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return _.mapKeys(action.payload, '_id')

    default:
      return state
  }
}
