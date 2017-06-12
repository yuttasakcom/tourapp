import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import * as actions from '../../actions'

import Dashboard from '../../pages/dashboard'
import Notifications from '../../pages/notifications'
import BoogkingSummary from '../../pages/bookingSummary'
import ManageTourPkg from '../../pages/manageTourPkg'
import ManageAgent from '../../pages/manageAgent'
import ContractRate from '../../pages/contractRate'

class Layout extends PureComponent {
  render() {
    const { hideAllGem } = this.props
    return (
      <div className="wrapper">
        <MainMenu />
        <div className="main-panel">
          <Toolbar />
          <div className="content" onClick={hideAllGem}>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/booking-summary" component={BoogkingSummary} />
            <Route path="/manage-tour-package" component={ManageTourPkg} />
            <Route path="/manage-agent" component={ManageAgent} />
            <Route path="/contract-rate" component={ContractRate} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(Layout))
