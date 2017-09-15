import React, { PureComponent } from 'react'

class Gem extends PureComponent {
  render() {
    const { icon, show, toggle, renderListItem, length } = this.props

    return (
      <li className={`dropdown${show && length ? ' open' : ''}`}>
        <a
          style={{ cursor: 'pointer' }}
          className="dropdown-toggle"
          onClick={toggle}
        >
          <i className="material-icons">{icon}</i>
          {length > 0 && <span className="notification">{length}</span>}
        </a>
        <ul className="dropdown-menu">{renderListItem()}</ul>
      </li>
    )
  }
}

export default Gem
