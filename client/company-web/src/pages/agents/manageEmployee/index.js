import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import EmployeeDataTable from './EmployeeDataTable'
import AddModal from './AddModal'
import * as actions from '../../actions'

class ManageEmployee extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Employees" description="Manage Employees">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.props.openAddEmployeeModal}
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
        <AddModal />
      </div>
    )
  }
}

export default connect(null, actions)(ManageEmployee)
