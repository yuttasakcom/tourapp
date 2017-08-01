import _ from 'lodash'
import React, { PureComponent } from 'react'
import flat from 'flat'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import ManageModal from './ManageModal'
import FilterDate from './FilterDate'
import FilterLinks from './FilterLinks'
import * as actions from '../../../actions'
import { waiting, readed } from '../../../actions/bookingStatus'

class BookingDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchBookings(this.props.date)
  }

  renderTableBody = () => {
    const { bookings, openManageBookingModal } = this.props

    if (!bookings) {
      return null
    }

    return _.map(bookings, booking =>
      <tr key={booking._id}>
        <td>
          {booking.agent.name}
        </td>
        <td>
          {booking.agent.email}
        </td>
        <td>
          {booking.pkg.name}
        </td>
        <td>
          {booking.tourist.name}
        </td>
        <td>
          {booking.tourist.adult}
        </td>
        <td>
          {booking.tourist.child}
        </td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-info btn-sm"
            style={{ margin: 0 }}
            onClick={() => openManageBookingModal(booking._id, booking.status)}
          >
            View
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { bookings } = this.props
    return (
      <Card title="Bookings" description="Manage booking">
        <div className="row">
          <div className="col-md-6">
            <FilterDate />
          </div>
          <div className="col-md-6">
            <FilterLinks />
          </div>
          <div className="col-md-12 col-sm-12">
            <BootstrapTable data={Object.values(bookings)} scrollTop="Bottom">
              <TableHeaderColumn dataField="_id" isKey>
                Booking ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="agent.name">
                Agent Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="pkg.name">
                Package
              </TableHeaderColumn>
              <TableHeaderColumn dataField="tourist.name">
                Tourist
              </TableHeaderColumn>
              <TableHeaderColumn dataField="tourist.adult">
                Adult
              </TableHeaderColumn>
              <TableHeaderColumn dataField="tourist.child">
                Child
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
        <ManageModal />
      </Card>
    )
  }
}

const mapStateToProps = ({
  booking: { bookings, visibilityFilter: { status, date } }
}) => {
  return {
    bookings: _.filter(
      bookings,
      booking =>
        status === waiting
          ? booking.status === waiting || booking.status === readed
          : booking.status === status
    ).map(flat),
    date
  }
}

export default connect(mapStateToProps, actions)(BookingDataTable)
