import React from 'react'

import Notification from './Notification'
import AcceptPending from './AcceptPending'
import RequestPending from './RequestPending'
import ProfileMenu from './ProfileMenu'
import ViewProfileModal from './ViewProfileModal'

class RightZone extends React.PureComponent {
  state = {
    showViewProfileModal: false
  }

  handleOpenViewProfileModal = acceptPendingId => {
    this.setState({ showViewProfileModal: true })
    this.props.openViewProfileModal(acceptPendingId)
  }

  render() {
    const {
      toggleProfileMenu,
      showProfileMenu,
      toggleAcceptPendingGem,
      showAcceptPendingGem,
      toggleNotificationGem,
      showNotificationGem,
      toggleRequestPendingGem,
      showRequestPendingGem,
      acceptPendings,
      accept,
      rejectRequest,
      selectedProfile
    } = this.props
    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <AcceptPending
            toggleAcceptPendingGem={toggleAcceptPendingGem}
            showAcceptPendingGem={showAcceptPendingGem}
            acceptPendings={acceptPendings}
            accept={accept}
            rejectRequest={rejectRequest}
            openViewProfileModal={this.handleOpenViewProfileModal}
          />
          <RequestPending
            toggleRequestPendingGem={toggleRequestPendingGem}
            showRequestPendingGem={showRequestPendingGem}
          />
          <Notification
            toggleNotificationGem={toggleNotificationGem}
            showNotificationGem={showNotificationGem}
          />
          <ProfileMenu
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
          />
        </ul>
        <ViewProfileModal
          closeViewProfileModal={this.setState({ showViewProfileModal: false })}
          showModal={this.state.showViewProfileModal}
          profile={selectedProfile}
          accept={accept}
          rejectRequest={rejectRequest}
        />
      </div>
    )
  }
}

export default RightZone
