import React, { PureComponent } from 'react'

import Select from 'react-select'

class BusPathItem extends PureComponent {
  render() {
    const { pathName } = this.props
    return (
      <div className="col-md-6">
        <h3>
          {pathName}
        </h3>
        <Select multi {...this.props} />
      </div>
    )
  }
}

export default BusPathItem
