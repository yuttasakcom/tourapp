import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import PkgDataTable from './PkgDataTable'
import * as actions from '../../actions'

class Booking extends PureComponent {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <PkgDataTable />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(Booking)
