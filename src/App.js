import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './pages/signIn'
import Dashboard from './pages/dashboard'
import Notifications from './pages/notifications'
import BoogkingSummary from './pages/bookingSummary'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/booking-summary" component={BoogkingSummary} />
        </div>
      </Router>
    )
  }
}

export default App
