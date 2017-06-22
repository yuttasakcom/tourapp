import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import QRCode from 'qrcode.react'
import * as actions from '../../../../actions'

class ProfileMenu extends PureComponent {
  render() {
    const { _id } = this.props
    return (
      <li className="dropdown open">
        <a
          style={{ cursor: 'pointer' }}
          onClick={this.props.signOut}
          className="dropdown-toggle"
        >
          <i className="material-icons">person</i>
          <p className="hidden-lg hidden-md">Profile</p>
        </a>
        <ul className="dropdown-menu">
          <li><a><QRCode value={_id} /></a></li>
          <li><a>{_id}</a></li>
        </ul>
      </li>
    )
  }
}

const mapStateToProps = ({ auth: { _id } }) => {
  return { _id }
}

export default connect(mapStateToProps, actions)(ProfileMenu)
