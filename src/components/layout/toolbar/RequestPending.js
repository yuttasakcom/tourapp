import React, { PureComponent } from 'react'

class RequestPending extends PureComponent {
  render() {
    return (
      <li>
        <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
          <i className="material-icons">arrow_upward</i>
          <span className="notification">5</span>
          <p className="hidden-lg hidden-md">Request Pendings</p>
        </a>
      </li>
    )
  }
}

export default RequestPending
