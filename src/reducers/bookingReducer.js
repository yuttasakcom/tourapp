import _ from 'lodash'
import { FETCH_PKGS_SUCCESS } from '../actions/types'

const initialState = {
  pkgs: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PKGS_SUCCESS:
      return { ...state, pkgs: _.mapKeys(action.payload, '_id') }

    default:
      return state
  }
}
