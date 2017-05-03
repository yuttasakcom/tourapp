import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'

export default () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route path="/signin" component={SignIn} />
      </div>
    </Router>
  </MuiThemeProvider>
)
