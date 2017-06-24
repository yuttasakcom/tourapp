import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import QRCode from 'qrcode.react'
import * as actions from '../../../../actions'

class ProfileMenu extends PureComponent {
  render() {
    const { _id, signOut, showProfileMenu, toggleProfileMenu } = this.props
    return (
      <li className={`dropdown${showProfileMenu ? ' open' : ''}`}>
        <a
          style={{ cursor: 'pointer' }}
          onClick={toggleProfileMenu}
          className="dropdown-toggle"
        >
          <i className="material-icons">person</i>
          <p className="hidden-lg hidden-md">Profile</p>
        </a>
        <ul className="dropdown-menu">
          <li><a><QRCode value={_id} /></a></li>
          <li><a>{_id}</a></li>
          <li><a onClick={signOut}>Sign Out</a></li>
        </ul>
      </li>
    )
  }
}

const mapStateToProps = ({ auth: { _id, showProfileMenu } }) => {
  return { _id, showProfileMenu }
}

export default connect(mapStateToProps, actions)(ProfileMenu)
