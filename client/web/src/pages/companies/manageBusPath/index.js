import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import PkgDataTable from './PkgDataTable'
import BusPathsModal from './busPathsModal'
import * as actions from '../../../actions/companies'

class ManageBusPath extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Paths">
          <div className="row">
            <div className="col-md-12">
              <PkgDataTable />
            </div>
          </div>
        </Card>
        <BusPathsModal />
      </div>
    )
  }
}

export default connect(null, actions)(ManageBusPath)
