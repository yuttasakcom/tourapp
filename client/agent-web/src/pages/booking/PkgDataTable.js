import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'
import AddModal from './AddModal'

class PkgDataTable extends PureComponent {
  render() {
    return (
      <Card title="Packages" description="Select package for book">
        <Table />
        <AddModal />
      </Card>
    )
  }
}

export default PkgDataTable
