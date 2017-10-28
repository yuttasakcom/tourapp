import React from 'react'
import { Helmet } from 'react-helmet'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import Notification from '../../containers/Notification'

class Layout extends React.PureComponent {
  state = {
    showNotificationGem: false,
    showRequestPendingGem: false,
    showAcceptPendingGem: false,
    showProfileMenu: false,
    showMenu: false
  }

  handleContentClick = () => {
    this.setState({
      showNotificationGem: false,
      showRequestPendingGem: false,
      showAcceptPendingGem: false,
      showProfileMenu: false,
      showMenu: false
    })
  }

  render() {
    const {
      logo,
      title,
      MenuList,
      children,
      acceptPendings,
      notifications,
      requestPendings,
      accept,
      rejectRequest,
      cancelRequest,
      selectedProfile,
      selectAcceptPending
    } = this.props
    const {
      showMenu,
      showNotificationGem,
      showRequestPendingGem,
      showAcceptPendingGem,
      showProfileMenu
    } = this.state
    return (
      <div className={`${showMenu ? 'nav-open ' : ''}wrapper`}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Notification />
        <MainMenu
          logo={logo}
          MenuList={MenuList}
          closeMenu={() => this.setState({ showMenu: false })}
        />
        <div className="main-panel">
          <Toolbar
            toggleMenu={() => this.setState({ showMenu: !showMenu })}
            toggleProfileMenu={() =>
              this.setState({ showProfileMenu: !showProfileMenu })}
            showProfileMenu={showProfileMenu}
            toggleAcceptPendingGem={() =>
              this.setState({ showAcceptPendingGem: !showAcceptPendingGem })}
            showAcceptPendingGem={showAcceptPendingGem}
            acceptPendings={acceptPendings}
            notifications={notifications}
            requestPendings={requestPendings}
            accept={accept}
            rejectRequest={rejectRequest}
            selectedProfile={selectedProfile}
            selectAcceptPending={selectAcceptPending}
            toggleNotificationGem={() =>
              this.setState({ showNotificationGem: !showNotificationGem })}
            showNotificationGem={showNotificationGem}
            toggleRequestPendingGem={() =>
              this.setState({
                showRequestPendingGem: !showRequestPendingGem
              })}
            showRequestPendingGem={showRequestPendingGem}
            cancelRequest={cancelRequest}
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
