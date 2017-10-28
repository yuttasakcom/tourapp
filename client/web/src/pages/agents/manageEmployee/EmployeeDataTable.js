import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class EmployeeDataTable extends PureComponent {
  state = {
    showEditEmployeeModal: false,
    showDeleteEmployeeModal: false
  }

  render() {
    return (
      <div>
        <Table
          openEditEmployeeModal={() =>
            this.setState({ showEditEmployeeModal: true })}
          openDeleteEmployeeModal={() =>
            this.setState({ showDeleteEmployeeModal: true })}
        />
        <EditModal
          showModal={this.state.showEditEmployeeModal}
          closeModal={() => this.setState({ showEditEmployeeModal: false })}
        />
        <DeleteModal
          showModal={this.state.showDeleteEmployeeModal}
          closeModal={() => this.setState({ showDeleteEmployeeModal: false })}
        />
      </div>
    )
  }
}

export default EmployeeDataTable
