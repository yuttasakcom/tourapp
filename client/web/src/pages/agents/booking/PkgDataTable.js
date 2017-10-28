import React, { PureComponent } from 'react'

import Table from './Table'
import AddModal from './AddModal'

class PkgDataTable extends PureComponent {
  state = {
    showAddBookingModal: false
  }

  render() {
    return (
      <div>
        <Table
          openAddBookingModal={() =>
            this.setState({ showAddBookingModal: true })}
        />
        <AddModal
          showModal={this.state.showAddBookingModal}
          closeModal={() => this.setState({ showAddBookingModal: false })}
        />
      </div>
    )
  }
}

export default PkgDataTable
