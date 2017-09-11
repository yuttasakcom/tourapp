import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route } from 'react-router-dom'

import { history } from '../store'
import AgentApp from './AgentApp'
import CompanyApp from './CompanyApp'

class Apps extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Route path="/agents" exact component={AgentApp} />
        <Route path="/companies" exact component={CompanyApp} />
      </Router>
    )
  }
}

export default Apps
