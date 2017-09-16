import React from 'react'
import { connect } from 'react-redux'

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
    const { authenticated } = this.props

    if (!authenticated) {
      return null
    }

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
      notifications,
      requestPendings,
      accept,
      rejectRequest,
      selectedProfile,
      cancelRequest
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
            requestPendings={requestPendings}
            cancelRequest={cancelRequest}
          />
          <Notification
            toggleNotificationGem={toggleNotificationGem}
            showNotificationGem={showNotificationGem}
            notifications={notifications}
          />
          <ProfileMenu
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
          />
        </ul>
        <ViewProfileModal
          closeViewProfileModal={() =>
            this.setState({ showViewProfileModal: false })}
          showModal={this.state.showViewProfileModal}
          profile={selectedProfile}
          accept={accept}
          rejectRequest={rejectRequest}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated })

export default connect(mapStateToProps)(RightZone)
