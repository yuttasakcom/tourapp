import React, { PureComponent } from 'react'

class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <a className="simple-text" style={{ color: '#FF0000' }}>
          Company App
        </a>
      </div>
    )
  }
}

export default Logo
