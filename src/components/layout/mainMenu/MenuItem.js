import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class MenuItem extends PureComponent {
  render() {
    const { text, title, path, icon } = this.props

    return (
      <li className={text === title ? 'active' : ''}>
        <Link to={path}>
          <i className="material-icons">{icon}</i>
          <p>{text}</p>
        </Link>
      </li>
    )
  }
}

export default MenuItem
