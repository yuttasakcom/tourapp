import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignIn from './pages/signIn'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={SignIn} />
        </div>
      </Router>
    )
  }
}

export default App
