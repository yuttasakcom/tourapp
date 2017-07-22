import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import Booking from './pages/booking'
import ManageCompany from './pages/manageCompany'
import ManageEmployee from './pages/manageEmployee'
import ManageBooking from './pages/manageBooking'
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
            <PrivateRoute
              path="/"
              exact
              component={() => <Redirect to="/dashboard" />}
            />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/booking" component={Booking} />
            <PrivateRoute path="/manage-company" component={ManageCompany} />
            <PrivateRoute path="/manage-employee" component={ManageEmployee} />
            <PrivateRoute path="/manage-booking" component={ManageBooking} />
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
