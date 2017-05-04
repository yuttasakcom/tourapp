import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import MangePackage from './components/companies/ManagePackage'
import CompanyMaster from './components/companies/master'

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
        <Route path="/company" component={CompanyMaster} />
        <div style={styles.content}>
          <Route path="/company/manage-package" component={MangePackage} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>
)
