import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import BusPathList from './BusPathList'
import Information from './Information'
import Card from '../../components/Card'

class PrintBusPath extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Path" style={{ height: '800px' }}>
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <FilterDate />
            </div>
            <Information />
            <div className="col-md-4 col-sm-4">
              <button className="btn btn-primary pull-right" onClick={() => ''}>
                Print
              </button>
              <button className="btn btn-success pull-right" onClick={() => ''}>
                Update
              </button>
            </div>
          </div>
          <BusPathList />
        </Card>
      </div>
    )
  }
}

export default PrintBusPath
