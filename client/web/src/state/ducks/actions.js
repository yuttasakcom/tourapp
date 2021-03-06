import { createActions } from 'redux-actions'

import auth from './auth/actions'
import companyPkg from './companies/pkg/actions'
import companyBusPath from './companies/busPath/actions'
import companyPrintBusPath from './companies/printBusPath/actions'
import companyDashboard from './companies/dashboard/actions'
import companyBookingSummary from './companies/bookingSummary/actions'
import companyBooking from './companies/booking/actions'
import companyNotification from './companies/notification/actions'
import companyAgent from './companies/agent/actions'
import agentDashboard from './agents/dashboard/actions'
import agentBooking from './agents/booking/actions'
import agentEmployee from './agents/employee/actions'
import agentManageBooking from './agents/manageBooking/actions'
import agentCompany from './agents/company/actions'
import agentNotification from './agents/notification/actions'

export default createActions({
  COMPANY: {
    PKG: companyPkg,
    BUS_PATH: companyBusPath,
    PRINT_BUS_PATH: companyPrintBusPath,
    DASHBOARD: companyDashboard,
    BOOKING_SUMMARY: companyBookingSummary,
    BOOKING: companyBooking,
    NOTIFICATION: companyNotification,
    AGENT: companyAgent
  },
  AGENT: {
    DASHBOARD: agentDashboard,
    BOOKING: agentBooking,
    EMPLOYEE: agentEmployee,
    MANAGE_BOOKING: agentManageBooking,
    COMPANY: agentCompany,
    NOTIFICATION: agentNotification
  },
  COMMON: {
    AUTH: auth
  }
})
