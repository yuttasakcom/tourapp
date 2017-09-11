import React, { PureComponent } from 'react'

import FilterDate from './FilterDate'
import Card from '../../../components/Card'
import Table from './Table'
import ManageModal from './ManageModal'
import FilterLinks from './FilterLinks'

class BookingDataTable extends PureComponent {
  render() {
    return (
      <Card title="Bookings" description="Manage booking">
        <div className="row">
          <div className="col-md-4">
            <FilterDate />
          </div>
          <div className="col-md-8">
            <FilterLinks />
          </div>
          <div className="col-md-12 col-sm-12">
            <Table />
          </div>
          <ManageModal />
        </div>
      </Card>
    )
  }
}

export default BookingDataTable
