import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class Table extends PureComponent {
  render() {
    const { bookingsSummary, description } = this.props
    return (
      <BootstrapTable
        data={bookingsSummary}
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn row="0" colSpan="2">
          <font color="red">
            <strong>
              {description}
            </strong>
          </font>
        </TableHeaderColumn>
        <TableHeaderColumn row="1" dataSort dataField="_id" isKey>
          Package Name
        </TableHeaderColumn>
        <TableHeaderColumn
          row="1"
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
