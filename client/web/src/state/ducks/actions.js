import { createActions } from 'redux-actions'

import AUTH from './auth/actions'

export default createActions({
  COMPANY: {},
  AGENT: {},
  COMMON: {
    AUTH
  }
})
