import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'

import BusPathItem from './BusPathItem'

class BusPathList extends PureComponent {
  renderBusPathList() {
    const { hotelsOptions } = this.props
    return hotelsOptions.map((hotelsOption, index) =>
      <BusPathItem options={hotelsOption} key={index} index={index + 1} />
    )
  }
  render() {
    return (
      <div className="row">
        {this.renderBusPathList()}
      </div>
    )
  }
}

const mapStateToProps = ({ busPath: { hotelsOptions } }) => ({
  hotelsOptions: map(hotelsOptions, hotelsOption =>
    map(hotelsOption, hotel => ({
      value: hotel._id,
      label: `${hotel.name} (${hotel.total})`
    }))
  )
})

export default connect(mapStateToProps)(BusPathList)
