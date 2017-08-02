import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import AgentDataTable from './AgentDataTable'
import RequestModal from './RequestModal'
import Notification from '../../components/Notification'
import * as actions from '../../actions'

class ManageAgent extends PureComponent {
  renderNotification() {
    const { show, type, message } = this.props.notification
    if (show) {
      return <Notification type={type} message={message} />
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderNotification()}
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

const mapStateToProps = ({ agent: { notification } }) => ({
  notification
})

export default connect(mapStateToProps, actions)(ManageAgent)
