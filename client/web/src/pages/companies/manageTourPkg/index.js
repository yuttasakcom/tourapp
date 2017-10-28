import React, { PureComponent } from 'react'

import Card from '../../../components/Card'
import TourPkgDataTable from './TourPkgDataTable'
import Add from './add'

class ManageTourPkg extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Packages" description="Manage tour packages">
          <div className="row">
            <div className="col-md-12">
              <Add />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TourPkgDataTable />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default ManageTourPkg
