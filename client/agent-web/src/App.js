import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from './components/NoMatch'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
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
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Redirect to="/dashboard" />}
              />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/booking" component={Booking} />
              <Route path="/manage-company" component={ManageCompany} />
              <Route path="/manage-employee" component={ManageEmployee} />
              <Route path="/manage-booking" component={ManageBooking} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
