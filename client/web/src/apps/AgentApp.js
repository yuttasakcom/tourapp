import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NoMatch from '../components/NoMatch'
import PrivateRoute from '../containers/PrivateRoute'
import Auth from '../pages/agents/auth'
import Dashboard from '../pages/agents/dashboard'
import Booking from '../pages/agents/booking'
import ManageCompany from '../pages/agents/manageCompany'
import ManageEmployee from '../pages/agents/manageEmployee'
import ManageBooking from '../pages/agents/manageBooking'
import Layout from '../pages/agents/layout'

class AgentApp extends PureComponent {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/agents/signin" component={Auth} />
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
    )
  }
}

export default AgentApp
