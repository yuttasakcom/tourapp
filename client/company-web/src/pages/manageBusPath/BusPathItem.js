import React, { PureComponent } from 'react'

import Select from 'react-select'

class BusPathItem extends PureComponent {
  render() {
    return (
      <div className="col-md-3">
        <Select multi {...this.props} />
      </div>
    )
  }
}

export default BusPathItem
