import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class MenuItem extends React.PureComponent {
  render() {
    const { path, icon, text, currentPath } = this.props
    return (
      <li className={path === currentPath ? 'active' : ''}>
        <Link to={path}>
          <i className="material-icons">{icon}</i>
          <p>{text}</p>
        </Link>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return { currentPath: state.router.location.pathname }
}

export default connect(mapStateToProps)(MenuItem)
