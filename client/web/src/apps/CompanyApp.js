import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from '../containers/PrivateRoute'
import NoMatch from '../components/NoMatch'
import Auth from '../pages/companies/auth'
import Dashboard from '../pages/companies/dashboard'
import BoogkingSummary from '../pages/companies/bookingSummary'
import ManageBooking from '../pages/companies/manageBooking'
import PrintBusPath from '../pages/companies/printBusPath'
import ManageBusPath from '../pages/companies/manageBusPath'
import ManageTourPkg from '../pages/companies/manageTourPkg'
import ManageAgent from '../pages/companies/manageAgent'
import Layout from '../pages/companies/layout'

class CompanyApp extends PureComponent {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/companies/signin" component={Auth} />
          <PrivateRoute
            userRole="company"
            path="/companies"
            exact
            component={() => <Redirect to="/companies/dashboard" />}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/manage-booking"
            component={ManageBooking}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/booking-summary"
            component={BoogkingSummary}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/print-bus-path"
            component={PrintBusPath}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/manage-bus-path"
            component={ManageBusPath}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/manage-tour-package"
            component={ManageTourPkg}
          />
          <PrivateRoute
            userRole="company"
            path="/companies/manage-agent"
            component={ManageAgent}
          />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    )
  }
}

export default CompanyApp
