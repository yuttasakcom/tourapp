import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from '../components/NoMatch'
import PrivateRoute from '../containers/PrivateRoute'
import SignIn from '../pages/agents/auth/SignIn'
import SignUp from '../pages/agents/auth/SignUp'
import Dashboard from '../pages/agents/dashboard'
import Booking from '../pages/agents/booking'
import ManageCompany from '../pages/agents/manageCompany'
import ManageEmployee from '../pages/agents/manageEmployee'
import ManageBooking from '../pages/agents/manageBooking'
import Layout from '../pages/agents/layout'

class AgentApp extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/agents/signin" component={SignIn} />
        <Route path="/agents/signup" component={SignUp} />
        <Layout>
          <Switch>
            <PrivateRoute
              userRole="agent"
              path="/agents"
              exact
              component={() => <Redirect to="/agents/dashboard" />}
            />
            <PrivateRoute
              userRole="agent"
              path="/agents/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              userRole="agent"
              path="/agents/booking"
              component={Booking}
            />
            <PrivateRoute
              userRole="agent"
              path="/agents/manage-company"
              component={ManageCompany}
            />
            <PrivateRoute
              userRole="agent"
              path="/agents/manage-employee"
              component={ManageEmployee}
            />
            <PrivateRoute
              userRole="agent"
              path="/agents/manage-booking"
              component={ManageBooking}
            />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Switch>
    )
  }
}

export default AgentApp
