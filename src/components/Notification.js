import React, { PureComponent } from 'react'

class Notification extends PureComponent {
  render() {
    return (
      <div className="alert alert-success">
        <div className="container-fluid">
          <div className="alert-icon">
            <i className="material-icons">check</i>
          </div>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <i className="material-icons">clear</i>
            </span>
          </button>
          <b>Success Alert:</b> Yuhuuu! You've got your $11.99 album from The
          Weeknd
        </div>
      </div>
    )
  }
}

export default Notification
