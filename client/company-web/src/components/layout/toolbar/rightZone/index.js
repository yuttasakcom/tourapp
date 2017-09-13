import React from 'react'

import Notification from './Notification'
import AcceptPending from './AcceptPending'
import RequestPending from './RequestPending'
import ProfileMenu from './ProfileMenu'
import ViewProfileModal from './ViewProfileModal'

class RightZone extends React.PureComponent {
  render() {
    const { toggleProfileMenu, showProfileMenu } = this.props
    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <AcceptPending />
          <RequestPending />
          <Notification />
          <ProfileMenu
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
          />
        </ul>
        <ViewProfileModal />
      </div>
    )
  }
}

export default RightZone
