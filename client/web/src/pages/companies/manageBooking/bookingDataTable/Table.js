import filter from 'lodash/filter'
import React, { PureComponent } from 'react'
import flat from 'flat'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../../state/ducks/actions'
import { waiting, readed } from '../../../../state/utils/bookingStatus'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBookings(this.props.date)
  }

  renderAction = (cell, row) => {
    const { openManageModal, updateBookingStatus, selectBooking } = this.props
    return (
      <button
        className="btn btn-info btn-sm"
        style={{ margin: 0 }}
        onClick={() => {
          selectBooking(row._id)
          updateBookingStatus({ id: row._id, status: readed })
          openManageModal()
        }}
      >
        View
      </button>
    )
  }

  render() {
    const { bookings } = this.props
    return (
      <BootstrapTable
        data={bookings}
        height={400}
        exportCSV
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Booking ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="agent.name">
          Agent Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="pkg.name">
          Package
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="tourist.name">
          Tourist
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          width="100"
          dataSort
          dataField="tourist.adult"
        >
          Adult
        </TableHeaderColumn>
        <TableHeaderColumn
          dataAlign="right"
          headerAlign="right"
          width="100"
          dataSort
          dataField="tourist.child"
        >
          Child
        </TableHeaderColumn>
        <TableHeaderColumn
          width="100"
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

const mapStateToProps = ({
  company: { booking: { bookings, visibilityFilter: { status, date } } }
}) => {
  return {
    bookings: filter(
      bookings,
      booking =>
        status === waiting
          ? booking.status === waiting || booking.status === readed
          : booking.status === status
    ).map(flat),
    date
  }
}

export default connect(mapStateToProps, actions.company.booking)(Table)
