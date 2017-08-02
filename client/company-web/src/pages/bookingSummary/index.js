import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import bookingSummary from '../../resources/images/booking_summary.png'

class BookingSummary extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Booking Summary" description="Show Booking Summary">
          <img src={bookingSummary} alt="booking summary" />
        </Card>
      </div>
    )
  }
}

export default BookingSummary
