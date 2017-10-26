import { createActions } from 'redux-actions'

import auth from './auth/actions'
import companyPkg from './companies/pkg/actions'
import companyBusPath from './companies/busPath/actions'
import companyPrintBusPath from './companies/printBusPath/actions'
import companyDashboard from './companies/dashboard/actions'
import companyBookingSummary from './companies/bookingSummary/actions'

export default createActions({
  COMPANY: {
    PKG: companyPkg,
    BUS_PATH: companyBusPath,
    PRINT_BUS_PATH: companyPrintBusPath,
    DASHBOARD: companyDashboard,
    BOOKING_SUMMARY: companyBookingSummary
  },
  AGENT: {},
  COMMON: {
    AUTH: auth
  }
})
