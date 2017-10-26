import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class Actions extends PureComponent {
  render() {
    const { updateBusPaths, printBusPaths } = this.props
    return (
      <div>
        <button className="btn btn-primary pull-right" onClick={printBusPaths}>
          Print
        </button>
        <button className="btn btn-success pull-right" onClick={updateBusPaths}>
          Update
        </button>
      </div>
    )
  }
}

export default connect(null, actions.company.printBusPaths)(Actions)
