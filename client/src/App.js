import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import MangePkgs from './components/companies/ManagePkgs'
import CompaniesMaster from './components/companies/master'

const styles = {
  content: {
    paddingLeft: 256,
    margin: 20,
  },
}

export default () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route path="/signin" component={SignIn} />
        <Route path="/companies" component={CompaniesMaster} />
        <div style={styles.content}>
          <Route path="/companies/manage-pkgs" component={MangePkgs} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>
)
