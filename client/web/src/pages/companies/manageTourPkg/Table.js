import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../../actions/companies'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderAction = (cell, row) => {
    const { openDeleteModal, openEditModal, selectPkg } = this.props
    return (
      <div>
        <button
          className="btn btn-warning btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectPkg(row._id)
            openEditModal()
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectPkg(row._id)
            openDeleteModal()
          }}
        >
          Delete
        </button>
      </div>
    )
  }

  render() {
    const { pkgs } = this.props
    return (
      <BootstrapTable
        data={Object.values(pkgs)}
        exportCSV
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Pkg ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="description">
          Description
        </TableHeaderColumn>
        <TableHeaderColumn
          width="100"
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="priceAdult"
        >
          Adult Price
        </TableHeaderColumn>
        <TableHeaderColumn
          width="100"
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="priceAdultRecommended"
        >
          Adult Selling Price
        </TableHeaderColumn>
        <TableHeaderColumn
          width="100"
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="priceChild"
        >
          Child Price
        </TableHeaderColumn>
        <TableHeaderColumn
          width="100"
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="priceChildRecommended"
        >
          Child Selling Price
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

const mapStateToProps = ({ company: { pkg: { pkgs } } }) => ({ pkgs })

export default connect(mapStateToProps, actions)(Table)
