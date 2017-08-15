import React, { PureComponent } from 'react'

import Select from 'react-select'

class BusPathItem extends PureComponent {
  render() {
    const { index } = this.props
    return (
      <div className="col-md-6">
        <h3>
          สายที่ {index}
        </h3>
        <Select multi {...this.props} />
      </div>
    )
  }
}

export default BusPathItem
