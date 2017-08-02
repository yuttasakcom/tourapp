import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchCompanies()
  }

  renderAction = (cell, row) => {
    const { openDeleteCompanyModal } = this.props
    return (
      <button
        className="btn btn-danger btn-sm"
        style={{ margin: 0 }}
        onClick={() => openDeleteCompanyModal(row._id)}
      >
        Delete
      </button>
    )
  }

  render() {
    const { companies } = this.props
    return (
      <BootstrapTable
        data={Object.values(companies)}
        exportCSV
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Company ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="email">
          Email
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

const mapStateToProps = ({ company: { companies } }) => ({ companies })

export default connect(mapStateToProps, actions)(Table)
