import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import DisplayField from '../../../../components/DisplayField'
import * as actions from '../../../../actions'

class ViewProfileModal extends PureComponent {
  render() {
    const {
      closeViewAgentProfileModal,
      showModal,
      agent,
      acceptAgent,
      rejectRequestAgent,
      fetchAgents
    } = this.props

    if (!agent) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeViewAgentProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agent Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayField label="Agent name" text={agent.name} />
          <DisplayField label="Agent email" text={agent.email} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="info"
            onClick={() => acceptAgent(agent._id, fetchAgents)}
          >
            Accept
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => rejectRequestAgent(agent._id)}
          >
            Reject
          </Button>
          <Button onClick={closeViewAgentProfileModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ notification }) => ({
  showModal: notification.showViewAgentProfileModal,
  agent: notification.acceptPendings[notification.selectedAcceptPending]
})

export default connect(mapStateToProps, actions)(ViewProfileModal)
