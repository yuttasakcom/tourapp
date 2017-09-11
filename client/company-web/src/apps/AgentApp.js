import React, { PureComponent } from 'react'
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

class AgentApp extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/agents/signin" component={SignIn} />
        <Route path="/agents/signup" component={SignUp} />
        <Layout>
          <Switch>
            <Route
              path="/agents"
              exact
              component={() => <Redirect to="/agents/dashboard" />}
            />
            <Route path="/agents/dashboard" component={Dashboard} />
            <Route path="/agents/booking" component={Booking} />
            <Route path="/agents/manage-company" component={ManageCompany} />
            <Route path="/agents/manage-employee" component={ManageEmployee} />
            <Route path="/agents/manage-booking" component={ManageBooking} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Switch>
    )
  }
}

export default AgentApp
