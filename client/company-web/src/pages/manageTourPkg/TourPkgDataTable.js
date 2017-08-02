import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class TourPkgDataTable extends PureComponent {
  render() {
    return (
      <div>
        <Table />
        <EditModal />
        <DeleteModal />
      </div>
    )
  }
}

export default TourPkgDataTable
