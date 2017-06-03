import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './pages/signIn'
import Dashboard from './pages/dashboard'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App
