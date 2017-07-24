import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import DataTable from '../../../components/dataTable'
import ManageModal from './ManageModal'
import FilterLinks from './FilterLinks'
import * as actions from '../../../actions'
import { waiting, readed } from '../../../actions/bookingStatus'

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
    const tableTitles = [
      'Agent Name',
      'Agent Email',
      'Package',
      'Tourist',
      'Adult',
      'Child'
    ]
    return (
      <Card title="Bookings" description="Manage booking">
        <div className="row">
          <div className="col-md-3">test</div>
          <div className="col-md-9">
            <FilterLinks />
          </div>
          <div
            className="col-md-12"
            style={{ display: 'block', overflow: 'auto', height: 400 }}
          >
            <DataTable
              tableTitles={tableTitles}
              renderTableBody={this.renderTableBody}
            />
          </div>
        </div>
        <ManageModal />
      </Card>
    )
  }
}

const mapStateToProps = ({ booking: { bookings, visibilityFilter } }) => {
  if (visibilityFilter === waiting) {
    return {
      bookings: _.filter(
        bookings,
        ({ status }) => status === waiting || status === readed
      )
    }
  }
  return {
    bookings: _.filter(bookings, ({ status }) => status === visibilityFilter)
  }
}

export default connect(mapStateToProps, actions)(BookingDataTable)
