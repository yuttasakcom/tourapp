import React, { PureComponent } from 'react'

class Gem extends PureComponent {
  renderListItem() {
    return this.props.items.map((item, index) =>
      <li key={index}><a>{item}</a></li>
    )
  }

  renderGemNumber() {
    const { items } = this.props
    if (!items.length) {
      return
    }
    return <span className="notification">{items.length}</span>
  }

  render() {
    const { icon, items, show, toggle } = this.props

    return (
      <li className={`dropdown${show && items.length ? ' open' : ''}`}>
        <a
          style={{ cursor: 'pointer' }}
          className="dropdown-toggle"
          onClick={toggle}
        >
          <i className="material-icons">{icon}</i>
          {this.renderGemNumber()}
        </a>
        <ul className="dropdown-menu">{this.renderListItem()}</ul>
      </li>
    )
  }
}

export default Gem
