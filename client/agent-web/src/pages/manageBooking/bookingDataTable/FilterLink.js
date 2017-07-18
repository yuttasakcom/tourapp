import React, { PureComponent } from 'react'

class FilterLink extends PureComponent {
  render() {
    const { icon, text, active, onClick, style } = this.props
    return (
      <li className={active ? 'active' : ''}>
        <a
          style={{ cursor: 'pointer' }}
          onClick={onClick}
          role="tab"
          data-toggle="tab"
        >
          <i className="material-icons" style={style}>
            {icon}
          </i>
          {text}
        </a>
      </li>
    )
  }
}

export default FilterLink