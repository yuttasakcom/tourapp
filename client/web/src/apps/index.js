import React, { PureComponent } from 'react'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route } from 'react-router-dom'

import { history } from '../store'
import Landing from '../pages/landing'
import AgentApp from './AgentApp'
import CompanyApp from './CompanyApp'

class Apps extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/agents" component={AgentApp} />
          <Route path="/companies" component={CompanyApp} />
        </div>
      </Router>
    )
  }
}

export default Apps
