import React from 'react'

import MainMenu from './MainMenu'
import Toolbar from './Toolbar'

export default ({ children }) => (
  <div className="wrapper">
    <MainMenu />
    <div className="main-panel">
      <Toolbar />
      <div className="content">{children}</div>
    </div>
  </div>
)
