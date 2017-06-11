import React, { PureComponent } from 'react'

class AcceptPending extends PureComponent {
  render() {
    return (
      <li>
        <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
          <i className="material-icons">arrow_downward</i>
          <span className="notification">5</span>
          <p className="hidden-lg hidden-md">Accept Pendings</p>
        </a>
      </li>
    )
  }
}

export default AcceptPending
