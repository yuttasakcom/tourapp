import React from 'react'

import LeftZone from './leftZone'
import RightZone from './rightZone'

class Toolbar extends React.PureComponent {
  render() {
    const { toggleMenu, toggleProfileMenu, showProfileMenu } = this.props
    return (
      <nav className="navbar navbar-transparent navbar-absolute">
        <div className="container-fluid">
          <LeftZone toggleMenu={toggleMenu} />
          <RightZone
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
          />
        </div>
      </nav>
    )
  }
}

export default Toolbar
