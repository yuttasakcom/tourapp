import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class BusPathDataTable extends PureComponent {
  state = {
    showEditBusPathModal: false,
    showDeleteBusPathModal: false
  }

  render() {
    return (
      <div>
        <Table
          openEditBusPathModal={() =>
            this.setState({ showEditBusPathModal: true })}
          openDeleteBusPathModal={() =>
            this.setState({ showDeleteBusPathModal: true })}
        />
        <EditModal
          showModal={this.state.showEditBusPathModal}
          closeModal={() => this.setState({ showEditBusPathModal: false })}
        />
        <DeleteModal
          showModal={this.state.showDeleteBusPathModal}
          closeModal={() => this.setState({ showDeleteBusPathModal: false })}
        />
      </div>
    )
  }
}

export default BusPathDataTable
