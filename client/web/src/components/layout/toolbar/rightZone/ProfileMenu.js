import React from 'react'
import { connect } from 'react-redux'

import QRCode from 'qrcode.react'
import actions from '../../../../state/ducks/actions'

class ProfileMenu extends React.PureComponent {
  render() {
    const { user, signOut, showProfileMenu, toggleProfileMenu } = this.props
    const { _id, sub, role } = user
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
          <li>
            <a>
              <QRCode value={_id} />
            </a>
          </li>
          <li>
            <a>ROLE: {role}</a>
          </li>
          <li>
            <a>EMAIL: {sub}</a>
          </li>
          <li>
            <a>ID: {_id}</a>
          </li>
          <li>
            <a style={{ cursor: 'pointer' }} onClick={signOut}>
              Sign Out
            </a>
          </li>
        </ul>
      </li>
    )
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ user })

export default connect(mapStateToProps, actions.common.auth)(ProfileMenu)
