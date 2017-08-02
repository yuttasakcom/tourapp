import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'
import DeleteModal from './DeleteModal'

class CompanyDataTable extends PureComponent {
  render() {
    return (
      <Card title="Companies" description="Manage companies">
        <Table />
        <DeleteModal />
      </Card>
    )
  }
}

export default CompanyDataTable
