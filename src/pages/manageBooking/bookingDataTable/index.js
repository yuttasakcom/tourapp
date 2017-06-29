import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import DataTable from '../../../components/dataTable'
import ManageModal from './ManageModal'
import FilterLinks from './FilterLinks'
import * as actions from '../../../actions'

class BookingDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchBookings()
  }

  renderTableBody = () => {
    const { bookings, openManageBookingModal } = this.props

    if (!bookings) {
      return null
    }

    return _.map(bookings, booking =>
      <tr key={booking._id}>
        <td>{booking.company.email}</td>
        <td>{booking.pkg.name}</td>
        <td>{booking.tourist.name}</td>
        <td>{booking.tourist.adult}</td>
        <td>{booking.tourist.child}</td>
        <td>{booking.status}</td>
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
      'Company',
      'Package',
      'Tourist',
      'Adult',
      'Child',
      'Status'
    ]
    return (
      <Card title="Bookings" description="Manage booking">
        <FilterLinks />
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <ManageModal />
      </Card>
    )
  }
}

const mapStateToProps = ({
  manageBooking: { bookings, visibilityFilter }
}) => ({
  bookings: _.filter(bookings, ({ status }) => status === visibilityFilter)
})

export default connect(mapStateToProps, actions)(BookingDataTable)
