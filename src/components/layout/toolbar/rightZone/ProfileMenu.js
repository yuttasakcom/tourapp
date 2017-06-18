import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../actions'

class ProfileMenu extends PureComponent {
  render() {
    return (
      <li>
        <a
          style={{ cursor: 'pointer' }}
          onClick={this.props.signOut}
          className="dropdown-toggle"
        >
          <i className="material-icons">person</i>
          <p className="hidden-lg hidden-md">Profile</p>
        </a>
      </li>
    )
  }
}

export default connect(null, actions)(ProfileMenu)
