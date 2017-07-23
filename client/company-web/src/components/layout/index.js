import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import Socket from './Socket'
import * as actions from '../../actions'

class Layout extends PureComponent {
  render() {
    const { authenticated } = this.props

    if (!authenticated) {
      return <Redirect to="/signin" />
    }

    const { hideAllGem, children, showMenu } = this.props
    return (
      <div className={`${showMenu ? 'nav-open ' : ''}wrapper`}>
        <Socket />
        <MainMenu />
        <div className="main-panel">
          <Toolbar />
          <div className="content" onClick={hideAllGem}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated }, layout: { showMenu } }) => {
  return { authenticated, showMenu }
}

export default withRouter(connect(mapStateToProps, actions)(Layout))
