import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'

import BusPathItem from './BusPathItem'

class BusPathList extends PureComponent {
  render() {
    const { hotelsOptions } = this.props
    return <BusPathItem options={hotelsOptions} />
  }
}

const mapStateToProps = ({ busPath }) => ({
  hotelsOptions: map(busPath.hotels, e => ({
    value: e._id,
    label: `${e.name} (${e.total})`
  }))
})

export default connect(mapStateToProps)(BusPathList)
