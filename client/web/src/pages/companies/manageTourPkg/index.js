import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import TourPkgDataTable from './TourPkgDataTable'
import Add from './add'
import * as actions from '../../../actions/companies'

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

export default connect(null, actions)(ManageTourPkg)
