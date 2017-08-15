import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'

import BusPathItem from './BusPathItem'
import * as actions from '../../actions'

class BusPathList extends PureComponent {
  renderBusPathList() {
    const { hotelsSelects, addBusPath } = this.props
    return map(hotelsSelects, (hotelsSelect, index) =>
      <BusPathItem
        options={hotelsSelect.options}
        value={hotelsSelect.values}
        key={index}
        index={index + 1}
        onChange={values => addBusPath(values, index)}
      />
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

const mapStateToProps = ({ printBusPath: { hotelsSelects } }) => ({
  hotelsSelects: map(hotelsSelects, hotelsSelect => ({
    options: map(hotelsSelect.options, hotel => ({
      value: hotel._id,
      label: `${hotel.name} (${hotel.total})`
    })),
    values: hotelsSelect.values
  }))
})

export default connect(mapStateToProps, actions)(BusPathList)
