import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import * as actions from '../../actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeDeleteAgentModal, deleteAgent, agent } = this.props

    if (!agent) {
      return <div />
    }

    return (
      <Modal show={showModal} onHide={closeDeleteAgentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete agent {agent.email} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeleteAgentModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deleteAgent(agent)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent }) => ({
  showModal: agent.showDeleteAgentModal,
  agent: agent.agents[agent.selectedAgent]
})

export default connect(mapStateToProps, actions)(DeleteModal)
