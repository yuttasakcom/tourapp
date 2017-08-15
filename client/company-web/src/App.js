import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from './components/NoMatch'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/dashboard'
import BoogkingSummary from './pages/bookingSummary'
import ManageBooking from './pages/manageBooking'
import PrintBusPath from './pages/printBusPath'
import ManageBusPath from './pages/manageBusPath'
import ManageTourPkg from './pages/manageTourPkg'
import ManageAgent from './pages/manageAgent'
import Layout from './components/layout'
import { history } from './store'

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Layout>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Redirect to="/dashboard" />}
              />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/manage-booking" component={ManageBooking} />
              <Route path="/booking-summary" component={BoogkingSummary} />
              <Route path="/print-bus-path" component={PrintBusPath} />
              <Route path="/manage-bus-path" component={ManageBusPath} />
              <Route path="/manage-tour-package" component={ManageTourPkg} />
              <Route path="/manage-agent" component={ManageAgent} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
