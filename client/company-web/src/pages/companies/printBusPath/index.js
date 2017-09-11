import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import FilterPkg from './FilterPkg'
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
            <div className="col-md-6 col-sm-6">
              <FilterDate />
            </div>
            <div className="col-md-6 col-sm-6">
              <FilterPkg />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <Information />
            </div>
            <div className="col-md-6 col-sm-6">
              <Actions />
            </div>
          </div>
          <BusPathList />
        </Card>
      </div>
    )
  }
}

export default PrintBusPath
