import React, { PureComponent } from 'react'

import Table from './Table'
import Card from '../../components/Card'
import FilterDate from './FilterDate'

class BookingSummary extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Booking Summary" description="Show Booking Summary">
          <div className="row">
            <div className="col-md-12">
              <FilterDate />
            </div>
            <div className="col-md-12">
              <Table />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default BookingSummary
