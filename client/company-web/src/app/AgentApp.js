import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from '../components/NoMatch'
import SignIn from '../pages/agents/auth/SignIn'
import SignUp from '../pages/agents/auth/SignUp'
import Dashboard from '../pages/agents/dashboard'
import Booking from '../pages/agents/booking'
import ManageCompany from '../pages/agents/manageCompany'
import ManageEmployee from '../pages/agents/manageEmployee'
import ManageBooking from '../pages/agents/manageBooking'
import Layout from '../components/layout'
import { history } from '../store'

class AgentApp extends PureComponent {
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

export default AgentApp
