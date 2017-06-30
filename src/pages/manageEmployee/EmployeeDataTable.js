import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import * as actions from '../../actions'

class EmployeeDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchEmployees()
  }

  renderTableBody = () => {
    const {
      employees,
      openDeleteEmployeeModal,
      openEditEmployeeModal
    } = this.props

    if (!employees) {
      return null
    }

    return _.map(employees, employee =>
      <tr key={employee._id}>
        <td>{employee.name}</td>
        <td>{employee.phoneNumber}</td>
        <td>{employee.email}</td>
        <td>{employee.password}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => openEditEmployeeModal(employee._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDeleteEmployeeModal(employee._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Phone Number', 'Email', 'Password']
    return (
      <Card title="Employees" description="Manage Employees">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <EditModal />
        <DeleteModal />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employee.employees
})

export default connect(mapStateToProps, actions)(EmployeeDataTable)
