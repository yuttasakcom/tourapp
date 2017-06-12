import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'
import * as actions from '../../actions'

class Layout extends PureComponent {
  render() {
    const { title, children, hideAllGem } = this.props

    return (
      <div className="wrapper">
        <MainMenu title={title} />
        <div className="main-panel">
          <Toolbar title={title} />
          <div className="content" onClick={hideAllGem}>{children}</div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(Layout)
