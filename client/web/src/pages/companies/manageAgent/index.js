import React, { PureComponent } from 'react'

import Card from '../../../components/Card'
import AgentDataTable from './AgentDataTable'
import RequestModal from './RequestModal'

class ManageAgent extends PureComponent {
  state = {
    showRequestAgentModal: false
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Agents" description="Manage agents">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={() => this.setState({ showRequestAgentModal: true })}
              >
                Request Agent
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <AgentDataTable />
            </div>
          </div>
        </Card>
        <RequestModal
          showModal={this.state.showRequestAgentModal}
          closeModal={() => this.setState({ showRequestAgentModal: false })}
        />
      </div>
    )
  }
}

export default ManageAgent
