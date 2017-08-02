import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

class EmployeeDataTable extends PureComponent {
  render() {
    return (
      <Card title="Employees" description="Manage Employees">
        <Table />
        <EditModal />
        <DeleteModal />
      </Card>
    )
  }
}

export default EmployeeDataTable
