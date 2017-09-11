import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'

class CompanyDataTable extends PureComponent {
  render() {
    return (
      <div>
        <Table />
        <DeleteModal />
      </div>
    )
  }
}

export default CompanyDataTable
