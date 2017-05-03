import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SignIn from './components/SignIn'

export default () => (
  <MuiThemeProvider>
    <SignIn />
  </MuiThemeProvider>
)
