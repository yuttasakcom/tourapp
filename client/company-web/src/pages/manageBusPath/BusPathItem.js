import React, { PureComponent } from 'react'

import Select from 'react-select'

class BusPathItem extends PureComponent {
  render() {
    const { index } = this.props
    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <h3>
          สายที่ {index}
        </h3>
        <Select multi {...this.props} />
      </div>
    )
  }
}

export default BusPathItem
