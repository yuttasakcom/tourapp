import filter from 'lodash/filter'
import flat from 'flat'
import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import { openAgentReport } from '../../../../state/utils'
import actions from '../../../../state/ducks/actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBookings()
  }

  renderAction = (cell, row) => {
    const { openManageBookingModal, selectBooking } = this.props
    return (
      <div>
        <button
          className="btn btn-info btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectBooking(row._id)
            openManageBookingModal()
          }}
        >
          View
        </button>
        <button
          className="btn btn-warning btn-sm"
          style={{ margin: 0 }}
          onClick={() => openAgentReport(`voucher?bookingId=${row._id}`)}
        >
          Voucher
        </button>
      </div>
    )
  }

  render() {
    const { bookings } = this.props
    return (
      <BootstrapTable
        data={Object.values(bookings)}
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
        <TableHeaderColumn dataSort dataField="company.name">
          Company Name
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

const mapStateToProps = ({
  agent: { manageBooking: { bookings, visibilityFilter: { status } } }
}) => ({
  bookings: filter(bookings, booking => booking.status === status).map(flat)
})

export default connect(mapStateToProps, actions.agent.manageBooking)(Table)
