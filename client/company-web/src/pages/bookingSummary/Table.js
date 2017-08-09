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
          dataSort
          dataField="totalBooking"
        >
          Booking Total
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalAdult"
        >
          Adult
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalChild"
        >
          Child
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

const mapStateToProps = ({
  bookingSummary: { bookingsSummary, visibilityFilter: { date } }
}) => ({ bookingsSummary, date })

export default connect(mapStateToProps, actions)(Table)
