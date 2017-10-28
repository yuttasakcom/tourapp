import React, { PureComponent } from 'react'

import Card from '../../../components/Card'
import EmployeeDataTable from './EmployeeDataTable'
import AddModal from './AddModal'

class ManageEmployee extends PureComponent {
  state = {
    showAddEmployeeModal: false
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Employees" description="Manage Employees">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={() => this.setState({ showAddEmployeeModal: true })}
              >
                Add
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <EmployeeDataTable />
            </div>
          </div>
        </Card>
        <AddModal
          showModal={this.state.showAddEmployeeModal}
          closeModal={() => this.setState({ showAddEmployeeModal: false })}
        />
      </div>
    )
  }
}

export default ManageEmployee
