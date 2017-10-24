import { createActions } from 'redux-actions'

import auth from './auth/actions'
import companyPkg from './companies/pkg/actions'
import companyBusPath from './companies/busPath/actions'

export default createActions({
  COMPANY: {
    PKG: companyPkg,
    BUS_PATH: companyBusPath
  },
  AGENT: {},
  COMMON: {
    AUTH: auth
  }
})
