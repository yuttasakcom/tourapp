import React, { PureComponent } from 'react'

import Notification from './Notification'
import AcceptPending from './AcceptPending'
import RequestPending from './RequestPending'
import ProfileMenu from './ProfileMenu'
import Searchbar from './Searchbar'
import ViewProfileModal from './ViewProfileModal'

class RightZone extends PureComponent {
  render() {
    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <AcceptPending />
          <RequestPending />
          <Notification />
          <ProfileMenu />
        </ul>
        <Searchbar />
        <ViewProfileModal />
      </div>
    )
  }
}

export default RightZone
