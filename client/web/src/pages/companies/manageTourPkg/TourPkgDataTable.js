import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class TourPkgDataTable extends PureComponent {
  state = {
    showEditModal: false,
    showDeleteModal: false
  }

  render() {
    return (
      <div>
        <Table
          openEditModal={() => this.setState({ showEditModal: true })}
          openDeleteModal={() => this.setState({ showDeleteModal: true })}
        />
        <EditModal
          closeModal={() => this.setState({ showEditModal: false })}
          showModal={this.state.showEditModal}
        />
        <DeleteModal
          closeModal={() => this.setState({ showDeleteModal: false })}
          showModal={this.state.showDeleteModal}
        />
      </div>
    )
  }
}

export default TourPkgDataTable
