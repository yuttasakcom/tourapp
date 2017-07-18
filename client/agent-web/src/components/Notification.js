import React, { PureComponent } from 'react'

class Notification extends PureComponent {
  render() {
    let { type, message } = this.props
    let icon
    switch (type) {
      case 'success':
        icon = 'check'
        break

      case 'warning':
        icon = 'warning'
        break

      case 'danger':
        icon = 'error_outline'
        break

      default:
        type = 'info'
        icon = 'info_outline'
    }

    return (
      <div className={`alert alert-${type}`}>
        <div className="container-fluid">
          <div className="alert-icon">
            <i className="material-icons">{icon}</i>
          </div>
          <button type="button" className="close">
            <span>
              <i className="material-icons">clear</i>
            </span>
          </button>
          {message}
        </div>
      </div>
    )
  }
}

export default Notification
