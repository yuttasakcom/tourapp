import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'rxjs'

import App from './App'
import './resources/css/index.css'

injectTapEventPlugin()

ReactDOM.render(<App />, document.getElementById('root'))
