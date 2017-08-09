import React, { PureComponent } from 'react'

class Card extends PureComponent {
  render() {
    const { title, children, style } = this.props
    return (
      <div className="card">
        <div className="card-header" data-background-color="purple">
          <h4 className="title" style={{ margin: 0 }}>
            {title}
          </h4>
        </div>
        <div className="card-content table-responsive" style={style}>
          {children}
        </div>
      </div>
    )
  }
}

export default Card
