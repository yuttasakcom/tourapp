import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import startCase from 'lodash/startCase'

class MenuItem extends PureComponent {
  render() {
    const { path, icon, currentPath } = this.props

    return (
      <li className={path === currentPath ? 'active' : ''}>
        <Link to={path}>
          <i className="material-icons">
            {icon}
          </i>
          <p>
            {startCase(path)}
          </p>
        </Link>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return { currentPath: state.router.location.pathname }
}

export default connect(mapStateToProps)(MenuItem)
