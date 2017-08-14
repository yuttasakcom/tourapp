import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import BusPathList from './BusPathList'
import Card from '../../components/Card'

class ManageBusPath extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Path" style={{ height: '400px' }}>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <FilterDate />
            </div>
          </div>
          <div className="row">
            <BusPathList />
          </div>
        </Card>
      </div>
    )
  }
}

export default ManageBusPath
