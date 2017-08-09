import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class Table extends PureComponent {
  render() {
    const { bookingsSummary } = this.props
    return (
      <BootstrapTable
        data={bookingsSummary}
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn dataSort dataField="_id" isKey>
          Package Name
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalSeat"
        >
          Total Seat
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Table
