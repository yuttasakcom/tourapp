import React, { PureComponent } from 'react'

import Logo from './Logo'

class MainMenu extends PureComponent {
  render() {
    const { logo, MenuList } = this.props
    return (
      <div className="sidebar" data-color="purple">
        <Logo logo={logo} />
        <div className="sidebar-wrapper">
          <MenuList />
        </div>
        <div className="sidebar-background" />
      </div>
    )
  }
}

export default MainMenu
