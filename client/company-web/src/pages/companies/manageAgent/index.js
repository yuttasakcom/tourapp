import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import AgentDataTable from './AgentDataTable'
import RequestModal from './RequestModal'
import * as actions from '../../actions'

class ManageAgent extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Agents" description="Manage agents">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.props.openRequestAgentModal}
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
        <RequestModal />
      </div>
    )
  }
}

export default connect(null, actions)(ManageAgent)
