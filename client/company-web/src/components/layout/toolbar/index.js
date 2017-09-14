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
      acceptPendings,
      accept,
      rejectRequest,
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
            accept={accept}
            rejectRequest={rejectRequest}
            selectedProfile={selectedProfile}
            openViewProfileModal={openViewProfileModal}
          />
        </div>
      </nav>
    )
  }
}

export default Toolbar
