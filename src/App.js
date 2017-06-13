import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import SignIn from './pages/signIn'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import Notifications from './pages/notifications'
import BoogkingSummary from './pages/bookingSummary'
import ManageTourPkg from './pages/manageTourPkg'
import ManageAgent from './pages/manageAgent'
import ContractRate from './pages/contractRate'
import Layout from './components/layout'
import { history } from './store'

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Layout>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/notifications" component={Notifications} />
            <PrivateRoute path="/booking-summary" component={BoogkingSummary} />
            <PrivateRoute path="/manage-tour-package" component={ManageTourPkg} />
            <PrivateRoute path="/manage-agent" component={ManageAgent} />
            <PrivateRoute path="/contract-rate" component={ContractRate} />
          </Layout>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default connect(mapStateToProps)(App)
