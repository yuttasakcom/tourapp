import { createActions } from 'redux-actions'

import auth from './auth/actions'
import companyPkg from './companies/pkg/actions'

export default createActions({
  COMPANY: {
    PKG: companyPkg
  },
  AGENT: {},
  COMMON: {
    AUTH: auth
  }
})
