import React from 'react'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import Notification from '../../containers/Notification'

class Layout extends React.PureComponent {
  state = {
    showNotificationGem: false,
    showRequestPendingGem: false,
    showAcceptPendingGem: false,
    showProfileMenu: false,
    showViewProfileModal: false,
    showMenu: false
  }

  handleContentClick = () => {
    this.setState({
      showNotificationGem: false,
      showRequestPendingGem: false,
      showAcceptPendingGem: false,
      showProfileMenu: false,
      showViewProfileModal: false,
      showMenu: false
    })
  }

  render() {
    const { logo, MenuList, children } = this.props
    const {
      showMenu,
      showNotificationGem,
      showRequestPendingGem,
      showAcceptPendingGem,
      showProfileMenu,
      showViewProfileModal
    } = this.state
    return (
      <div className={`${showMenu ? 'nav-open ' : ''}wrapper`}>
        <Notification />
        <MainMenu logo={logo} MenuList={MenuList} />
        <div className="main-panel">
          <Toolbar
            toggleMenu={() => this.setState({ showMenu: !showMenu })}
            toggleProfileMenu={() =>
              this.setState({ showProfileMenu: !showProfileMenu })}
            showProfileMenu={showProfileMenu}
          />
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
