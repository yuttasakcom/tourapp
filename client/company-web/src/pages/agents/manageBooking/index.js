import React, { PureComponent } from 'react'

import BookingDataTable from './bookingDataTable'

class ManageBooking extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <BookingDataTable />
      </div>
    )
  }
}

export default ManageBooking
