import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class MenuItem extends React.PureComponent {
  render() {
    const { path, icon, text, location: { pathname } } = this.props
    return (
      <li className={path === pathname ? 'active' : ''}>
        <Link to={path}>
          <i className="material-icons">{icon}</i>
          <p>{text}</p>
        </Link>
      </li>
    )
  }
}

export default withRouter(MenuItem)
