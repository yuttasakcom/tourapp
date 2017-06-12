import React, { PureComponent } from 'react'

class ProfileMenu extends PureComponent {
  render() {
    return (
      <li>
        <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
          <i className="material-icons">person</i>
          <p className="hidden-lg hidden-md">Profile</p>
        </a>
      </li>
    )
  }
}

export default ProfileMenu
