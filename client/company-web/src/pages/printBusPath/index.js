import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import BusPathList from './BusPathList'
import Information from './Information'
import Actions from './Actions'
import Card from '../../components/Card'

class PrintBusPath extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Path" style={{ height: '800px' }}>
          <div className="row">
            <FilterDate />
            <Information />
            <Actions />
          </div>
          <BusPathList />
        </Card>
      </div>
    )
  }
}

export default PrintBusPath
