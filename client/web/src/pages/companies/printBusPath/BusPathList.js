import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'

import BusPathItem from './BusPathItem'
import actions from '../../../state/ducks/actions'

class BusPathList extends PureComponent {
  renderBusPathList() {
    const { hotelsSelects, manageBusPath } = this.props
    return map(hotelsSelects, ({ options, values, busPathName }, index) => (
      <BusPathItem
        options={options}
        value={values}
        key={index}
        pathName={busPathName}
        onChange={vals => manageBusPath({ values: vals, index })}
      />
    ))
  }

  render() {
    return <div className="row">{this.renderBusPathList()}</div>
  }
}

const mapStateToProps = ({ company: { printBusPath: { hotelsSelects } } }) => ({
  hotelsSelects: map(hotelsSelects, hotelsSelect => ({
    options: map(hotelsSelect.options, hotel => ({
      value: hotel._id,
      label: `${hotel.name} (${hotel.total})`
    })),
    values: hotelsSelect.values,
    busPathId: hotelsSelect.busPathId,
    busPathName: hotelsSelect.busPathName
  }))
})

export default connect(mapStateToProps, actions.company.printBusPath)(
  BusPathList
)
