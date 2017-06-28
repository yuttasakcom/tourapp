import React, { PureComponent } from 'react'

import BookingDataTable from './BookingDataTable'

class ManageBooking extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <BookingDataTable />
          </div>
        </div>
      </div>
    )
  }
}

export default ManageBooking
