import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'
import ContractRateModal from './contractRateModal'

class AgentDataTable extends PureComponent {
  state = {
    showDeleteAgentModal: false,
    showContractRateModal: false
  }

  render() {
    return (
      <div>
        <Table
          openDeleteAgentModal={() =>
            this.setState({ showDeleteAgentModal: true })}
          openContractRateModal={() =>
            this.setState({ showContractRateModal: true })}
        />
        <ContractRateModal
          showModal={this.state.showContractRateModal}
          closeModal={() => this.setState({ showContractRateModal: false })}
        />
        <DeleteModal
          showModal={this.state.showDeleteAgentModal}
          closeModal={() => this.setState({ showDeleteAgentModal: false })}
        />
      </div>
    )
  }
}

export default AgentDataTable
