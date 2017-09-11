import flat from 'flat'
import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../../actions/agents'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
    this.props.fetchHotels()
  }

  renderAction = (cell, row) => {
    const { openAddBookingModal } = this.props
    return (
      <button
        className="btn btn-primary btn-sm"
        style={{ margin: 0 }}
        onClick={() => openAddBookingModal(row._id)}
      >
        Book
      </button>
    )
  }

  render() {
    const { pkgs } = this.props
    return (
      <BootstrapTable
        data={pkgs}
        exportCSV
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Booking ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="company.name">
          Company Name
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="100"
          dataSort
          dataField="priceAdult"
        >
          Adult Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataAlign="right"
          headerAlign="right"
          width="100"
          dataSort
          dataField="priceAdultRecommended"
        >
          Adult Selling Price
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="100"
          dataSort
          dataField="priceChild"
        >
          Child Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataAlign="right"
          headerAlign="right"
          width="100"
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

const mapStateToProps = ({ booking: { pkgs } }) => ({
  pkgs: Object.values(pkgs).map(flat)
})

export default connect(mapStateToProps, actions)(Table)
