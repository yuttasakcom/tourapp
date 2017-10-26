import React, { PureComponent } from 'react'

import Table from './Table'
import Card from '../../../../components/Card'
import ManageModal from './ManageModal'
import FilterDate from './FilterDate'
import FilterLinks from './FilterLinks'

class BookingDataTable extends PureComponent {
  state = {
    showManageModal: false
  }

  render() {
    return (
      <Card title="Bookings" description="Manage booking">
        <div className="row">
          <div className="col-md-6">
            <FilterDate />
          </div>
          <div className="col-md-6">
            <FilterLinks />
          </div>
          <div className="col-md-12 col-sm-12">
            <Table
              openManageModal={() => this.setState({ showManageModal: true })}
            />
          </div>
        </div>
        <ManageModal
          showModal={this.state.showManageModal}
          closeManageModal={() => this.setState({ showManageModal: false })}
        />
      </Card>
    )
  }
}

export default BookingDataTable
