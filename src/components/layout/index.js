import React from 'react'

import MainMenu from './mainMenu'
import Toolbar from './toolbar'

export default ({ children, title }) =>
  <div className="wrapper">
    <MainMenu title={title} />
    <div className="main-panel">
      <Toolbar title={title} />
      <div className="content">{children}</div>
    </div>
  </div>
