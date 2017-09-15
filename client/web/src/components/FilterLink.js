import React, { PureComponent } from 'react'

class FilterLink extends PureComponent {
  render() {
    const { icon, text, total, active, onClick, style } = this.props
    return (
      <li className={active ? 'active' : ''}>
        <a
          style={{ cursor: 'pointer', paddingTop: '0px', paddingBottom: '0px' }}
          onClick={onClick}
          role="tab"
          data-toggle="tab"
        >
          <i className="material-icons" style={{ padding: '2px', ...style }}>
            {icon}
          </i>
          {text} ({total})
        </a>
      </li>
    )
  }
}

export default FilterLink
