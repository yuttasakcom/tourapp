import React, { PureComponent } from 'react'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import Notification from '../Notification'

class Layout extends PureComponent {
  state = {
    showNotificationGem: false,
    showRequestPendingGem: false,
    showAcceptPendingGem: false,
    showProfileMenu: false,
    showViewAgentProfileModal: false,
    showMenu: false
  }

  handleContentClick = () => {
    this.setState({
      showNotificationGem: false,
      showRequestPendingGem: false,
      showAcceptPendingGem: false,
      showProfileMenu: false,
      showViewAgentProfileModal: false,
      showMenu: false
    })
  }

  render() {
    const { logo, MenuList, children } = this.props
    const { showMenu } = this.state
    return (
      <div className={`${showMenu ? 'nav-open ' : ''}wrapper`}>
        <Notification />
        <MainMenu logo={logo} MenuList={MenuList} />
        <div className="main-panel">
          <Toolbar toggleMenu={() => this.setState({ showMenu: !showMenu })} />
          <div
            className="content"
            style={{ marginTop: 30 }}
            onClick={this.handleContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
