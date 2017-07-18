import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import DeleteModal from './DeleteModal'
import ContractRateModal from './ContractRateModal'
import * as actions from '../../actions'

class AgentDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchAgents()
  }

  openContractRateModal(agent) {
    const { openContractRateModal, fetchAgentContractRates } = this.props
    fetchAgentContractRates(agent)
    openContractRateModal(agent._id)
  }

  renderTableBody = () => {
    const { agents, openDeleteAgentModal } = this.props

    if (!agents) {
      return null
    }

    return _.map(agents, agent =>
      <tr key={agent._id}>
        <td>{agent.name}</td>
        <td>{agent.email}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-info btn-sm"
            onClick={() => this.openContractRateModal(agent)}
          >
            Contract Rate
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDeleteAgentModal(agent._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Email']
    return (
      <Card title="Agents" description="Manage agents">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <ContractRateModal />
        <DeleteModal />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  agents: state.agent.agents
})

export default connect(mapStateToProps, actions)(AgentDataTable)
