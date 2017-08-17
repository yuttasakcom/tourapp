import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Actions extends PureComponent {
  render() {
    const { updateBusPaths } = this.props
    return (
      <div className="col-md-4 col-sm-4">
        <button className="btn btn-primary pull-right" onClick={() => ''}>
          Print
        </button>
        <button className="btn btn-success pull-right" onClick={updateBusPaths}>
          Update
        </button>
      </div>
    )
  }
}

export default connect(null, actions)(Actions)
