import React, { PureComponent } from 'react'

import Logo from './Logo'
import MenuList from './MenuList'

class MainMenu extends PureComponent {
  render() {
    return (
      <div className="sidebar" data-color="purple">
        <Logo />
        <div className="sidebar-wrapper">
          <MenuList />
        </div>
        <div className="sidebar-background" />
      </div>
    )
  }
}

export default MainMenu
