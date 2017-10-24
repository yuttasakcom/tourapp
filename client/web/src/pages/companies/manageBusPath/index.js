import React, { PureComponent } from 'react'

import Card from '../../../components/Card'
import PkgDataTable from './PkgDataTable'
import BusPathsModal from './busPathsModal'

class ManageBusPath extends PureComponent {
  state = {
    showBusPathsModal: false
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Bus Paths">
          <div className="row">
            <div className="col-md-12">
              <PkgDataTable
                openBusPathsModal={() =>
                  this.setState({ showBusPathsModal: true })}
              />
            </div>
          </div>
        </Card>
        <BusPathsModal
          showModal={this.state.showBusPathsModal}
          closeModal={() => this.setState({ showBusPathsModal: false })}
        />
      </div>
    )
  }
}

export default ManageBusPath
