import React, { PureComponent } from 'react'

class Actions extends PureComponent {
  render() {
    return (
      <div className="col-md-4 col-sm-4">
        <button className="btn btn-primary pull-right" onClick={() => ''}>
          Print
        </button>
        <button className="btn btn-success pull-right" onClick={() => ''}>
          Update
        </button>
      </div>
    )
  }
}

export default Actions
