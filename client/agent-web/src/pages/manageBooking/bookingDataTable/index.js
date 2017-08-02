import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FilterDate from './FilterDate'
import Card from '../../../components/Card'
import DataTable from '../../../components/dataTable'
import ManageModal from './ManageModal'
import FilterLinks from './FilterLinks'
import * as actions from '../../../actions'

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
          {booking.company.name}
        </td>
        <td>
          {booking.company.email}
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
            onClick={() => openManageBookingModal(booking._id)}
          >
            View
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = [
      'Company Name',
      'Company Email',
      'Package',
      'Tourist',
      'Adult',
      'Child'
    ]
    return (
      <Card title="Bookings" description="Manage booking">
        <div className="row">
          <div className="col-md-5">
            <FilterDate />
          </div>
          <div className="col-md-7">
            <FilterLinks />
          </div>
          <div
            className="col-md-12 col-sm-12"
            style={{ display: 'block', overflow: 'auto', height: 400 }}
          >
            <DataTable
              tableTitles={tableTitles}
              renderTableBody={this.renderTableBody}
            />
          </div>
          <ManageModal />
        </div>
      </Card>
    )
  }
}

const mapStateToProps = ({
  manageBooking: { bookings, visibilityFilter: { status, date } }
}) => ({
  bookings: _.filter(bookings, booking => booking.status === status),
  date
})

export default connect(mapStateToProps, actions)(BookingDataTable)
