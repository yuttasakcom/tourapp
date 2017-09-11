import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../../actions/agents'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchEmployees()
  }

  renderAction = (cell, row) => {
    const { openDeleteEmployeeModal, openEditEmployeeModal } = this.props
    return (
      <div>
        <button
          className="btn btn-warning btn-sm"
          style={{ margin: 0 }}
          onClick={() => openEditEmployeeModal(row._id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: 0 }}
          onClick={() => openDeleteEmployeeModal(row._id)}
        >
          Delete
        </button>
      </div>
    )
  }

  render() {
    const { employees } = this.props
    return (
      <BootstrapTable
        data={Object.values(employees)}
        exportCSV
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Employee ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="phoneNumber">
          Phone Number
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="email">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="password">
          Password
        </TableHeaderColumn>
        <TableHeaderColumn
          width="180"
          dataFormat={this.renderAction}
          headerAlign="center"
          dataAlign="center"
          export={false}
        >
          Action
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({ employee: { employees } }) => ({ employees })

export default connect(mapStateToProps, actions)(Table)
