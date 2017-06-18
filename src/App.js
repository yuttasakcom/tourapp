import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
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
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default App
