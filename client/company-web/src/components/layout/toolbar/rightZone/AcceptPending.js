import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class AcceptPending extends PureComponent {
  componentDidMount() {
    this.props.fetchAcceptPendings()
  }

  renderListItem = () => {
    const {
      acceptPendings,
      acceptAgent,
      rejectRequestAgent,
      fetchAgents,
      openViewAgentProfileModal
    } = this.props

    return map(acceptPendings, acceptPending =>
      <li key={acceptPending._id} style={{ width: '200px' }}>
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => openViewAgentProfileModal(acceptPending._id)}
        >
          {acceptPending.email}
        </a>
        <button
          className="btn btn-danger btn-sm pull-right"
          onClick={() => rejectRequestAgent(acceptPending._id)}
        >
          Reject
        </button>
        <button
          className="btn btn-info btn-sm pull-right"
          onClick={() => acceptAgent(acceptPending._id, fetchAgents)}
        >
          Accept
        </button>
      </li>
    )
  }

  render() {
    const {
      showAcceptPendingGem,
      toggleAcceptPendingGem,
      acceptPendings
    } = this.props
    return (
      <Gem
        icon="arrow_downward"
        length={Object.keys(acceptPendings).length}
        renderListItem={this.renderListItem}
        show={showAcceptPendingGem}
        toggle={toggleAcceptPendingGem}
      />
    )
  }
}

const mapStateToProps = ({
  notification: { showAcceptPendingGem, acceptPendings }
}) => {
  return { showAcceptPendingGem, acceptPendings }
}

export default connect(mapStateToProps, actions)(AcceptPending)
