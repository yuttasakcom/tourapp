import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="simple-text" style={{ color: '#FF0000' }}>
          {this.props.logo}
        </Link>
      </div>
    )
  }
}

export default Logo
