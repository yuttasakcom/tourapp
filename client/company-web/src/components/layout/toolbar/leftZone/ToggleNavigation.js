import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../actions'

class ToggleNavigation extends PureComponent {
  render() {
    const { toggleMenu } = this.props
    return (
      <button type="button" className="navbar-toggle" onClick={toggleMenu}>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    )
  }
}

export default connect(null, actions)(ToggleNavigation)
