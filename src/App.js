import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import Booking from './pages/booking'
import ManageCompany from './pages/manageCompany'
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
            <PrivateRoute path="/booking" component={Booking} />
            <PrivateRoute path="/manage-company" component={ManageCompany} />
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
