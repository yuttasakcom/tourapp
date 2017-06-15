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

  renderTableBody = () => {
    const { agents, openContractRateModal, openDeleteAgentModal } = this.props

    if (!agents) {
      return <tr />
    }

    return _.map(agents, agent =>
      <tr key={agent._id}>
        <td>{agent._id}</td>
        <td>{agent.email}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-info btn-sm"
            onClick={() => openContractRateModal(agent._id)}
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
    const tableTitles = ['_id', 'Email']
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
