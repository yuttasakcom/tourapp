import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import * as actions from '../../actions'

class BookingDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchBookings()
  }

  renderTableBody = () => {
    const { bookings } = this.props

    if (!bookings) {
      return null
    }

    return _.map(bookings, booking =>
      <tr key={booking._id}>
        <td>{booking.agent.email}</td>
        <td>{booking.pkg.name}</td>
        <td>{booking.tourist.name}</td>
        <td>{booking.tourist.adult}</td>
        <td>{booking.tourist.child}</td>
        <td>{booking.status}</td>
      </tr>
    )
  }

  render() {
    const tableTitles = [
      'Agent',
      'Package',
      'Tourist',
      'Adult',
      'Child',
      'Status'
    ]
    return (
      <Card title="Bookings" description="Manage booking">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
      </Card>
    )
  }
}

const mapStateToProps = ({ booking: { bookings } }) => ({
  bookings
})

export default connect(mapStateToProps, actions)(BookingDataTable)
