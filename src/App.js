import React, { Component } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route } from 'react-router-dom'

import SignIn from './pages/signIn'
import Dashboard from './pages/dashboard'
import Notifications from './pages/notifications'
import BoogkingSummary from './pages/bookingSummary'
import ManageTourPkg from './pages/manageTourPkg'
import ManageAgent from './pages/manageAgent'
import ContractRate from './pages/contractRate'
import Layout from './components/layout'
import { history } from './store'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/booking-summary" component={BoogkingSummary} />
          <Route path="/manage-tour-package" component={ManageTourPkg} />
          <Route path="/manage-agent" component={ManageAgent} />
          <Route path="/contract-rate" component={ContractRate} />
        </Layout>
      </Router>
    )
  }
}

export default App
