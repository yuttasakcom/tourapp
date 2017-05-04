import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'rxjs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'
import './resources/css/index.css'

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
