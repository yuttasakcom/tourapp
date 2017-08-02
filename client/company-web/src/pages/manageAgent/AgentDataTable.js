import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import ContractRateModal from './contractRateModal'

class AgentDataTable extends PureComponent {
  render() {
    return (
      <div>
        <Table />
        <ContractRateModal />
        <DeleteModal />
      </div>
    )
  }
}

export default AgentDataTable
