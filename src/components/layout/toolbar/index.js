import React from 'react'

import Notification from './Notification'
import AcceptPending from './AcceptPending'
import RequestPending from './RequestPending'
import ProfileMenu from './ProfileMenu'
import Searchbar from './Searchbar'

export default ({ title }) =>
  <nav className="navbar navbar-transparent navbar-absolute">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand">{title}</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <AcceptPending />
          <RequestPending />
          <Notification />
          <ProfileMenu />
        </ul>
        <Searchbar />
      </div>
    </div>
  </nav>
