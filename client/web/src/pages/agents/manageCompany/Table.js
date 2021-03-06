import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchCompanies()
  }

  renderAction = (cell, row) => {
    const { openDeleteCompanyModal, selectCompany } = this.props
    return (
      <button
        className="btn btn-danger btn-sm"
        style={{ margin: 0 }}
        onClick={() => {
          selectCompany(row._id)
          openDeleteCompanyModal()
        }}
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
        height={400}
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

const mapStateToProps = ({ agent: { company: { companies } } }) => ({
  companies
})

export default connect(mapStateToProps, actions.agent.company)(Table)
