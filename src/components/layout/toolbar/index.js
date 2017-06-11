import React from 'react'

import Notification from './Notification'
import AcceptPending from './AcceptPending'
import RequestPending from './RequestPending'
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
          <li>
            <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
              <i className="material-icons">dashboard</i>
              <p className="hidden-lg hidden-md">Dashboard</p>
            </a>
          </li>
          <AcceptPending />
          <RequestPending />
          <Notification />
          <li>
            <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
              <i className="material-icons">person</i>
              <p className="hidden-lg hidden-md">Profile</p>
            </a>
          </li>
        </ul>

        <Searchbar />
      </div>
    </div>
  </nav>
