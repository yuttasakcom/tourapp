import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class TourPkgDataTable extends PureComponent {
  render() {
    return (
      <Card title="Packages" description="Manage tour packages">
        <Table />
        <EditModal />
        <DeleteModal />
      </Card>
    )
  }
}

export default TourPkgDataTable
