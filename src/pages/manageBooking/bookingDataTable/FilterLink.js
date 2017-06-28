import React, { PureComponent } from 'react'

class FilterLink extends PureComponent {
  render() {
    const { icon, text, active } = this.props
    return (
      <li className={active ? 'active' : ''}>
        <a href="#tasks" role="tab" data-toggle="tab">
          <i className="material-icons">{icon}</i>
          {text}
        </a>
      </li>
    )
  }
}

export default FilterLink
