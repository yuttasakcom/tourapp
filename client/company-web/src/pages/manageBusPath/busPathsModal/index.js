import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import BusPathDataTable from './BusPathDataTable'
import AddModal from './AddModal'
import * as actions from '../../../actions'

class ManageBusPath extends PureComponent {
  openAddBusPathModal = () => {
    this.props.openAddBusPathModal()
    this.props.fetchBusPathHotels()
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Paths">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.openAddBusPathModal}
              >
                Add
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BusPathDataTable />
            </div>
          </div>
        </Card>
        <AddModal />
      </div>
    )
  }
}

export default connect(null, actions)(ManageBusPath)
