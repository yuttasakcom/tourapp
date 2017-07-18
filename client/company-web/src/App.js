import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import BoogkingSummary from './pages/bookingSummary'
import ManageBooking from './pages/manageBooking'
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
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/manage-booking" component={ManageBooking} />
            <PrivateRoute path="/booking-summary" component={BoogkingSummary} />
            <PrivateRoute
              path="/manage-tour-package"
              component={ManageTourPkg}
            />
            <PrivateRoute path="/manage-agent" component={ManageAgent} />
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
