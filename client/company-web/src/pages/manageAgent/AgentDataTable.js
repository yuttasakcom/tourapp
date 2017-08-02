import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'
import DeleteModal from './DeleteModal'
import ContractRateModal from './ContractRateModal'

class AgentDataTable extends PureComponent {
  render() {
    return (
      <Card title="Agents" description="Manage agents">
        <Table />
        <ContractRateModal />
        <DeleteModal />
      </Card>
    )
  }
}

export default AgentDataTable
