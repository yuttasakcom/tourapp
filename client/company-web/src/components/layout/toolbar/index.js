import React from 'react'

import LeftZone from './leftZone'
import RightZone from './rightZone'

class Toolbar extends React.PureComponent {
  render() {
    const {
      toggleMenu,
      toggleProfileMenu,
      showProfileMenu,
      toggleAcceptPendingGem,
      showAcceptPendingGem,
      toggleNotificationGem,
      showNotificationGem,
      toggleRequestPendingGem,
      showRequestPendingGem,
      acceptPendings,
      notifications,
      requestPendings,
      accept,
      rejectRequest,
      cancelRequest,
      selectedProfile,
      openViewProfileModal
    } = this.props
    return (
      <nav className="navbar navbar-transparent navbar-absolute">
        <div className="container-fluid">
          <LeftZone toggleMenu={toggleMenu} />
          <RightZone
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
            toggleAcceptPendingGem={toggleAcceptPendingGem}
            showAcceptPendingGem={showAcceptPendingGem}
            acceptPendings={acceptPendings}
            notifications={notifications}
            requestPendings={requestPendings}
            accept={accept}
            rejectRequest={rejectRequest}
            selectedProfile={selectedProfile}
            openViewProfileModal={openViewProfileModal}
            toggleNotificationGem={toggleNotificationGem}
            showNotificationGem={showNotificationGem}
            toggleRequestPendingGem={toggleRequestPendingGem}
            showRequestPendingGem={showRequestPendingGem}
            cancelRequest={cancelRequest}
          />
        </div>
      </nav>
    )
  }
}

export default Toolbar
