import React, { Component } from 'react'

class Gem extends Component {
  state = { open: false }

  renderListItem() {
    return this.props.items.map((item, index) =>
      <li key={index}><a>{item}</a></li>
    )
  }

  render() {
    const { icon, items } = this.props

    return (
      <li className={`dropdown${this.state.open ? ' open' : ''}`}>
        <a
          style={{ cursor: 'pointer' }}
          className="dropdown-toggle"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <i className="material-icons">{icon}</i>
          <span className="notification">{items.length}</span>
        </a>
        <ul className="dropdown-menu">{this.renderListItem()}</ul>
      </li>
    )
  }
}

export default Gem
