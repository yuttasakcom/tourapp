import React, { Component } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'

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
        <Layout />
      </Router>
    )
  }
}

export default App
