import React, { PureComponent } from 'react'

class ToggleNavigation extends PureComponent {
  render() {
    return (
      <button type="button" className="navbar-toggle" data-toggle="collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    )
  }
}

export default ToggleNavigation
