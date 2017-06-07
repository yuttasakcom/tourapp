import React from 'react'

import Logo from './Logo'
import MenuList from './MenuList'

export default ({ title }) =>
  <div className="sidebar" data-color="purple">
    <Logo />
    <div className="sidebar-wrapper">
      <MenuList title={title} />
    </div>
  </div>
