import React, { PureComponent } from 'react'

import ToggleNavigation from './ToggleNavigation'
import Title from './Title'

class LeftZone extends PureComponent {
  render() {
    return (
      <div className="navbar-header">
        <ToggleNavigation />
        <Title />
      </div>
    )
  }
}

export default LeftZone
