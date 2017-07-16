import React, { PureComponent } from 'react'

import bookingSummary from '../../resources/images/booking_summary.png'

class BookingSummary extends PureComponent {
  render() {
    return (
      <div>
        <img src={bookingSummary} alt="booking summary" />
      </div>
    )
  }
}

export default BookingSummary
