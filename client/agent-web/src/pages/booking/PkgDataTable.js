import React, { PureComponent } from 'react'

import Table from './Table'
import AddModal from './AddModal'

class PkgDataTable extends PureComponent {
  render() {
    return (
      <div>
        <Table />
        <AddModal />
      </div>
    )
  }
}

export default PkgDataTable
