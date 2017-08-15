import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import BusPathList from './BusPathList'
import Card from '../../components/Card'

class ManageBusPath extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Path" style={{ height: '800px' }}>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <FilterDate />
            </div>
            <div className="col-md-6 col-sm-6">
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

export default ManageBusPath
