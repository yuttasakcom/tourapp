import React, { PureComponent } from 'react'

import LeftZone from './leftZone'
import RightZone from './rightZone'

class Toolbar extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-transparent navbar-absolute">
        <div className="container-fluid">
          <LeftZone />
          <RightZone />
        </div>
      </nav>
    )
  }
}

export default Toolbar
