import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from '../components/NoMatch'
import SignIn from '../pages/companies/auth/SignIn'
import SignUp from '../pages/companies/auth/SignUp'
import Dashboard from '../pages/companies/dashboard'
import BoogkingSummary from '../pages/companies/bookingSummary'
import ManageBooking from '../pages/companies/manageBooking'
import PrintBusPath from '../pages/companies/printBusPath'
import ManageBusPath from '../pages/companies/manageBusPath'
import ManageTourPkg from '../pages/companies/manageTourPkg'
import ManageAgent from '../pages/companies/manageAgent'
import Layout from '../components/layout'

class CompanyApp extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/companies/signin" component={SignIn} />
        <Route path="/companies/signup" component={SignUp} />
        <Layout>
          <Switch>
            <Route
              path="/companies"
              exact
              component={() => <Redirect to="/companies/dashboard" />}
            />
            <Route path="/companies/dashboard" component={Dashboard} />
            <Route path="/companies/manage-booking" component={ManageBooking} />
            <Route
              path="/companies/booking-summary"
              component={BoogkingSummary}
            />
            <Route path="/companies/print-bus-path" component={PrintBusPath} />
            <Route
              path="/companies/manage-bus-path"
              component={ManageBusPath}
            />
            <Route
              path="/companies/manage-tour-package"
              component={ManageTourPkg}
            />
            <Route path="/companies/manage-agent" component={ManageAgent} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Switch>
    )
  }
}

export default CompanyApp
