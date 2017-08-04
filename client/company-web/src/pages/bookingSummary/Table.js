import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingsSummary(this.props.date)
  }

  render() {
    const { bookingsSummary } = this.props
    return (
      <BootstrapTable
        data={bookingsSummary}
        exportCSV
        height={400}
        search
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
          width="100"
          dataSort
          dataField="totalAdult"
        >
          Adult
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="100"
          dataSort
          dataField="totalChild"
        >
          Child
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="100"
          dataSort
          dataField="totalSeat"
        >
          Total Seat
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="200"
          dataSort
          dataField="totalAdultIncome"
        >
          Total Adult Income
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="200"
          dataSort
          dataField="totalChildIncome"
        >
          Total Child Income
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="200"
          dataSort
          dataField="totalIncome"
        >
          Total Income
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({
  bookingSummary: { bookingsSummary, visibilityFilter: { date } }
}) => ({ bookingsSummary, date })

export default connect(mapStateToProps, actions)(Table)
