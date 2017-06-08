import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './pages/signIn'
import Dashboard from './pages/dashboard'
import Notifications from './pages/notifications'
import BoogkingSummary from './pages/bookingSummary'
import ManageTourPkg from './pages/manageTourPkg'
import ManageAgent from './pages/manageAgent'
import ContractRate from './pages/contractRate'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/booking-summary" component={BoogkingSummary} />
          <Route path="/manage-tour-package" component={ManageTourPkg} />
          <Route path="/manage-agent" component={ManageAgent} />
          <Route path="/contract-rate" component={ContractRate} />
        </div>
      </Router>
    )
  }
}

export default App
